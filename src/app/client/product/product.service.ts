import { Injectable } from '@nestjs/common';
import {
  IInfoProduct,
  IPrePayload,
  IProduct,
  IProductFull,
} from '$types/interfaces';
import { Connection, Repository } from 'typeorm';
import Product from '$database/entities/Product';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '$shared/auth/auth.service';
import { Exception } from '$helpers/exception';
import { ErrorCode, ProductStatus } from '$types/enums';
import OrderCart from '$database/entities/OrderCart';
import {
  FindAllMemberModelDto,
  loadMoreFindAllMemberModelDto,
} from './dto/GetAllProductsDto';
import { returnLoadMore, returnPaging } from '$helpers/utils';
import UserShop from '$database/entities/UserShop';
import User from '$database/entities/User';
import ProductRecent from '$database/entities/ProductRecent';
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
  ) {}

  async getAllProducts(params: FindAllMemberModelDto) {
    const queryBuilder = this.productRepository
      .createQueryBuilder('p')
      .where('p.status != 0');
    const [results, totalItems] = await queryBuilder
      .skip(params.skip)
      .take(params.pageSize)
      .getManyAndCount();
    return returnPaging(results, totalItems, params);
  }

  // async getAllProducts(params: loadMoreFindAllMemberModelDto) {
  //   const queryBuilder = this.productRepository.createQueryBuilder('p');
  //   if (params.takeAfter) {
  //     queryBuilder.andWhere('p.id < :takeAfter', { takeAfter: params.takeAfter })
  //   }
  //   const results= await queryBuilder.orderBy('p.id', 'DESC').take(params.pageSize).getMany();
  //   return returnLoadMore(results, params);
  // }

  async addProduct(product: IProduct, user: IPrePayload) {
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
      const savingProduct = {
        ...product,
        sellerId: userHaveShop.id,
      };
      const savedProduct = await this.productRepository.save(savingProduct);
      return savedProduct;
    } catch (error) {
      throw new Exception(
        ErrorCode.Unknown_Error,
        error?.message || 'Unknown_Error',
      );
    }
  }

  async getProduct(id: number) {
    try {
      const product = await this.productRepository.findOne({ id: id });
      return product;
    } catch (error) {
      throw new Exception(
        ErrorCode.Unknown_Error,
        error?.message || 'Unknown_Error',
      );
    }
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
  // async getAllProducts(params: loadMoreFindAllMemberModelDto) {
  //   const queryBuilder = this.productRepository.createQueryBuilder('p');
  //   if (params.takeAfter) {
  //     queryBuilder.andWhere('p.id < :takeAfter', { takeAfter: params.takeAfter })
  //   }
  //   const results= await queryBuilder.orderBy('p.id', 'DESC').take(params.pageSize).getMany();
  //   return returnLoadMore(results, params);
  // }

  async getRecentVisitedProduct(
    memberId: number,
    params: loadMoreFindAllMemberModelDto,
  ) {
    const queryBuilder = this.productRecentRepository.createQueryBuilder('pr');
    if (params.takeAfter) {
      queryBuilder.andWhere('pr.id < :takeAfter AND pr.visitor_id = :memberId', {
        takeAfter: params.takeAfter,
        memberId: memberId
      });
    }

    const results = await queryBuilder
      .orderBy('pr.id', 'DESC')
      .take(params.pageSize)
      .getMany();
    return returnLoadMore(results, params);
  }
}