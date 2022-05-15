import { Injectable } from '@nestjs/common';
import {
  IInfoProduct,
  IPrePayload,
  IProduct,
  IProductFull,
} from '$types/interfaces';
import { Connection, Repository, getConnection } from 'typeorm';
import Product from '$database/entities/Product';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '$shared/auth/auth.service';
import { Exception } from '$helpers/exception';
import { CommonStatus, ErrorCode, ProductStatus } from '$types/enums';
import OrderCart from '$database/entities/OrderCart';
import {
  FindAllMemberModelDto,
  loadMoreFindAllMemberModelDto,
} from './dto/GetAllProductsDto';
import UserShop from '$database/entities/UserShop';
import User from '$database/entities/User';
import ProductRecent from '$database/entities/ProductRecent';
import Judge from '$database/entities/Judge';
import Like from '$database/entities/Like';
const camelcaseKeys = require('camelcase-keys');
@Injectable()
export class ProductService {
  constructor(
    private readonly connection: Connection,
    private readonly authService: AuthService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(OrderCart)
    private readonly orderCartRepository: Repository<OrderCart>,
    @InjectRepository(UserShop)
    private readonly userShopRepository: Repository<UserShop>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ProductRecent)
    private readonly productRecentRepository: Repository<ProductRecent>,
    @InjectRepository(Judge)
    private readonly judgeRepository: Repository<Judge>,
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  // async getAllProducts(params: FindAllMemberModelDto) {
  //   const queryBuilder = this.productRepository
  //     .createQueryBuilder('p')
  //     .where('p.status != 0');
  //   const [results, totalItems] = await queryBuilder
  //     .skip(params.skip)
  //     .take(params.pageSize)
  //     .getManyAndCount();
  //   return returnPaging(results, totalItems, params);
  // }

  async getAllProducts(params: loadMoreFindAllMemberModelDto) {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    let query =
      'SELECT p.*, AVG(j.stars) as rating FROM product p LEFT JOIN judge j ON p.id = j.product_code GROUP BY p.id';
    if (params.takeAfter) {
      query = query + ' WHERE p.id < ' + params.takeAfter;
    }
    query += ' ORDER BY p.id DESC';
    if (params.pageSize) {
      query = query + ' LIMIT ' + params.pageSize;
    }
    const results = await queryRunner.query(query);
    return camelcaseKeys(results);
  }

  async addProduct(product: IProduct, user: IPrePayload) {
    const userHaveShop = await this.userShopRepository.findOne({
      where: { ownerId: user.id },
    });
    if (!!!userHaveShop) {
      throw new Exception(
        ErrorCode.Not_Register_Shop,
        "You don' have shop now! Please register first!",
      );
    }
    const savingProduct = {
      ...product,
      sellerId: userHaveShop.id,
    };
    const savedProduct = await this.productRepository.save(savingProduct);
    return savedProduct;
  }

  async getProduct(id: number) {
    const queryBuilder = this.productRepository
      .createQueryBuilder('p')
      .innerJoinAndMapOne('p.shop', UserShop, 'us', 'p.sellerId = us.id')
      .leftJoinAndMapMany('p.judges', Judge, 'j', 'j.productCode = p.id')
      .innerJoinAndMapOne('j.user', User, 'u', 'u.id = j.memberId')
      .select([
        'p.id',
        'p.productName',
        'p.productLine',
        'p.quantityInStock',
        'p.priceEach',
        'p.image',
        'p.description',
        'p.origin',
        'p.discount',
        'p.soldQuantity',
        'us.id',
        'us.shopName',
        'j.id',
        'j.content',
        'j.stars',
        'u.id',
        'u.email',
        'u.username',
        'u.image',
      ])
      .where('p.id = :pId', { pId: id })
      .orderBy('p.id', 'DESC')
      .getOne();
    return await queryBuilder;
  }

  async getProducByUser(userId: number, productId: number) {
    const queryBuilder = this.productRepository
      .createQueryBuilder('p')
      .innerJoinAndMapOne('p.shop', UserShop, 'us', 'p.sellerId = us.id')
      .leftJoinAndMapMany('p.judges', Judge, 'j', 'j.productCode = p.id')
      .innerJoinAndMapOne('j.user', User, 'u', 'u.id = j.memberId')
      .leftJoinAndMapOne(
        'p.like',
        Like,
        'l',
        'l.productCode = p.id AND l.memberId = :lMemberId',
        { lMemberId: userId },
      )
      .select([
        'p.id',
        'p.productName',
        'p.productLine',
        'p.quantityInStock',
        'p.priceEach',
        'p.image',
        'p.description',
        'p.origin',
        'p.discount',
        'p.soldQuantity',
        'us.id',
        'us.shopName',
        'j.id',
        'j.content',
        'j.stars',
        'u.id',
        'u.email',
        'u.username',
        'u.image',
        'l.id',
      ])
      .where('p.id = :pId', { pId: productId })
      .orderBy('p.id', 'DESC')
      .getOne();
    return await queryBuilder;
  }

  async deleteProduct(id: number, user: IPrePayload) {
    try {
      const userHaveShop = await this.userShopRepository.findOne({
        where: { ownerId: user.id },
      });
      if (!!!userHaveShop) {
        throw new Exception(
          ErrorCode.Not_Register_Shop,
          "You don' have shop now! Please register first!",
        );
      }

      const productInDb = await this.productRepository.findOne(id);

      if (productInDb.sellerId != userHaveShop.id) {
        throw new Exception(
          ErrorCode.Forbidden_Resource,
          'You are not owner of this products',
        );
      }

      await this.productRepository.update(
        { id: productInDb.id },
        { status: ProductStatus.Deleted },
      );

      return {
        success: true,
      };
    } catch (error) {
      throw new Exception(
        ErrorCode.Unknown_Error,
        error?.message || 'Unknown_Error',
      );
    }
  }

  async changeInfoProduct(
    productId: number,
    productInfo: IInfoProduct,
    user: IPrePayload,
  ) {
    try {
      const userHaveShop = await this.userShopRepository.findOne({
        where: { ownerId: user.id },
      });
      if (!!!userHaveShop) {
        throw new Exception(
          ErrorCode.Not_Register_Shop,
          "You don' have shop now! Please register first!",
        );
      }

      const productInDb = await this.productRepository.findOne(productId);

      if (productInDb.sellerId != userHaveShop.id) {
        throw new Exception(
          ErrorCode.Forbidden_Resource,
          'You are not owner of this products',
        );
      }

      const product = (await this.productRepository.update(
        { id: productId },
        productInfo,
      )) as unknown as IProductFull;
      return product;
    } catch (error) {
      throw new Exception(
        ErrorCode.Unknown_Error,
        error?.message || 'Unknown_Error',
      );
    }
  }

  async recentVisited(memberId: number, productCode: number) {
    const productInDb = await this.productRepository.findOne({
      where: { id: productCode },
    });
    if (!!!productInDb || productInDb.status == ProductStatus.Deleted) {
      throw new Exception(
        ErrorCode.Not_Found,
        'Product you visited is not found!',
      );
    }

    return this.productRecentRepository.save({
      visitorId: memberId,
      productCode: productCode,
    });
  }

  async getRecentVisitedProduct(
    memberId: number,
    params: loadMoreFindAllMemberModelDto,
  ) {
    const queryBuilder = this.productRecentRepository
      .createQueryBuilder('pr')
      .innerJoinAndMapOne('pr.product', Product, 'p', 'p.id = pr.productCode');
    if (params.takeAfter) {
      queryBuilder.andWhere(
        'pr.id < :takeAfter AND pr.visitor_id = :memberId',
        {
          takeAfter: params.takeAfter,
          memberId: memberId,
        },
      );
    }

    const results = await queryBuilder.orderBy('pr.id', 'DESC').getMany();
    return results;
  }
}
