import { Injectable } from '@nestjs/common';
import {
  IInfoProduct,
  IPrePayload,
  IProduct,
  IProductFull,
} from '$types/interfaces';
import { Connection, Repository, getConnection, Like as like } from 'typeorm';
import Product from '$database/entities/Product';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '$shared/auth/auth.service';
import { Exception } from '$helpers/exception';
import {
  CommonStatus,
  ErrorCode,
  OrderStatus,
  ProductStatus,
} from '$types/enums';
import OrderCart from '$database/entities/OrderCart';
import {
  FindAllMemberModelDto,
  loadMoreFindAllMemberModelDto,
  TypeProducts,
} from './dto/GetAllProductsDto';
import UserShop from '$database/entities/UserShop';
import User from '$database/entities/User';
import ProductRecent from '$database/entities/ProductRecent';
import Judge from '$database/entities/Judge';
import Like from '$database/entities/Like';
import Image from '$database/entities/Image';
import Order from '$database/entities/Order';
import OrderDetail from '$database/entities/OrderDetail';
import { allow, number } from 'joi';
import { getManager } from 'typeorm';
import { resolveUrl } from 'ajv/dist/compile/resolve';
const cloudinary = require('cloudinary');
const fs = require('fs');
const camelcaseKeys = require('camelcase-keys');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

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
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async getAllProducts(params: TypeProducts) {
    const results = this.productRepository
      .createQueryBuilder('p')
      .leftJoinAndMapMany('p.judges', Judge, 'j', 'p.id = j.productCode')
      .where('p.status = :pStatus', { pStatus: ProductStatus.Active });
    if (params.type > 1) {
      results.andWhere('p.productLine = :productLine', {
        productLine: params.type,
      });
    }

    return results.orderBy('p.id', 'DESC').getMany();
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
    const { otherPhotos, ...filteredProduct } = product;
    const savingProduct = {
      ...filteredProduct,
      sellerId: userHaveShop.id,
    };
    const savedProduct = await this.productRepository.save(savingProduct);
    const savingOthersPhoto = otherPhotos.map((photo) => {
      return {
        productCode: savedProduct.id,
        name: photo,
      };
    });
    this.imageRepository.insert(savingOthersPhoto);
    return savedProduct;
  }

  async getProduct(id: number) {
    const queryBuilder = await this.productRepository
      .createQueryBuilder('p')
      .innerJoinAndMapOne('p.shop', UserShop, 'us', 'p.sellerId = us.id')
      .leftJoinAndMapMany('p.judges', Judge, 'j', 'j.productCode = p.id')
      .leftJoinAndMapOne('j.user', User, 'u', 'u.id = j.memberId')
      .leftJoinAndMapMany(
        'p.otherImages',
        Image,
        'i',
        'i.productCode = p.id AND i.status = :iStatus',
        { iStatus: CommonStatus.Active },
      )
      .leftJoinAndMapMany(
        'us.products',
        Product,
        'p1',
        'p1.sellerId = us.id AND p1.status = :p1Status',
        { p1Status: ProductStatus.Active },
      )
      .leftJoinAndMapMany('p1.judges', Judge, 'j1', 'j1.productCode = p1.id')
      .innerJoinAndMapOne(
        'us.member',
        User,
        'u1',
        'u1.id = us.ownerId AND u1.status = :u1Status',
        { u1Status: CommonStatus.Active },
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
        'us.coverPhoto',
        'us.profilePicture',
        'j.id',
        'j.content',
        'j.stars',
        'u.id',
        'u.email',
        'u.username',
        'u.image',
        'i.id',
        'i.name',
        'p1.id',
        'p1.image',
        'p1.productName',
        'p1.soldQuantity',
        'p1.priceEach',
        'j1.id',
        'j1.stars',
        'u1.id',
        'u1.username',
        'u1.image',
      ])
      .orderBy('p1.soldQuantity', 'DESC')
      .where('p.id = :pId AND p.status = :pStatus', {
        pId: id,
        pStatus: ProductStatus.Active,
      })
      .getOne();
    return queryBuilder;
  }

  async getProducByUser(userId: number, productId: number) {
    const queryBuilder = await this.productRepository
      .createQueryBuilder('p')
      .innerJoinAndMapOne('p.shop', UserShop, 'us', 'p.sellerId = us.id')
      .leftJoinAndMapMany('p.judges', Judge, 'j', 'j.productCode = p.id')
      .leftJoinAndMapOne('j.user', User, 'u', 'u.id = j.memberId')
      .leftJoinAndMapMany(
        'p.otherImages',
        Image,
        'i',
        'i.productCode = p.id AND i.status = :iStatus',
        { iStatus: CommonStatus.Active },
      )
      .leftJoinAndMapMany(
        'us.products',
        Product,
        'p1',
        'p1.sellerId = us.id AND p1.status = :p1Status',
        { p1Status: ProductStatus.Active },
      )
      .leftJoinAndMapMany('p1.judges', Judge, 'j1', 'j1.productCode = p1.id')
      .innerJoinAndMapOne(
        'us.member',
        User,
        'u1',
        'u1.id = us.ownerId AND u1.status = :u1Status',
        { u1Status: CommonStatus.Active },
      )
      .leftJoinAndMapOne(
        'p.like',
        Like,
        'l',
        'l.productCode = p.id AND l.memberId = :memberId AND l.status = :lStatus',
        { memberId: userId, lStatus: CommonStatus.Active },
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
        'us.coverPhoto',
        'us.profilePicture',
        'j.id',
        'j.content',
        'j.stars',
        'u.id',
        'u.email',
        'u.username',
        'u.image',
        'i.id',
        'i.name',
        'p1.id',
        'p1.image',
        'p1.productName',
        'p1.soldQuantity',
        'p1.priceEach',
        'j1.id',
        'j1.stars',
        'u1.id',
        'u1.username',
        'u1.image',
        'l.id',
      ])
      .orderBy('p1.soldQuantity', 'DESC')
      .where('p.id = :pId', { pId: productId })
      .getOne();
    return queryBuilder;
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
    memberId: number,
  ) {
    const { otherImages, ...savingProducts } = productInfo;
    const productInDb = await this.productRepository
      .createQueryBuilder('p')
      .leftJoinAndMapMany(
        'p.otherImages',
        Image,
        'i',
        'i.productCode = p.id AND i.status = :iStatus',
        { iStatus: CommonStatus.Active },
      )
      .innerJoinAndMapOne(
        'p.shop',
        UserShop,
        'us',
        'us.id = p.sellerId AND us.status = :usStatus',
        { usStatus: CommonStatus.Active },
      )
      .where('p.id = :pProductId', { pProductId: productId })
      .getOne();
    if (!productInDb) {
      throw new Exception(ErrorCode.Not_Found, 'Cannot Found this product!');
    }

    if (productInDb['shop'].ownerId != memberId) {
      throw new Exception(
        ErrorCode.Permisstion_Denied,
        'You cannot change info of this product',
      );
    }

    const otherImagesIds = productInDb['otherImages']
      ? productInDb['otherImages'].map((image) => {
          return image.id;
        })
      : [];

    await this.productRepository.update({ id: productId }, savingProducts);
    await this.imageRepository
      .createQueryBuilder('i')
      .delete()
      .where('id IN (:otherImagesIds)', { otherImagesIds: otherImagesIds })
      .execute();
    const savingImages = otherImages
      ? otherImages.map((image) => {
          return {
            name: image,
            productCode: productId,
          };
        })
      : [];
    await this.imageRepository.insert(savingImages);
    return {
      success: true,
    };
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
    const queryBuilder = this.productRepository
      .createQueryBuilder('p')
      .innerJoinAndMapOne(
        'p.judges',
        ProductRecent,
        'pr',
        'p.id = pr.productCode',
      )
      .where('pr.visitorId = :prMemberId  AND p.status = :pStatus', {
        prMemberId: memberId,
        pStatus: ProductStatus.Active,
      })
      .select([
        'pr.id',
        'pr.productCode',
        'p.id',
        'p.productName',
        'p.discount',
        'p.soldQuantity',
        'p.priceEach',
        'p.origin',
        'p.image',
      ]);

    const results = await queryBuilder.orderBy('pr.id', 'DESC').getMany();
    return results;
  }

  async getLikedProducts(memberId: number) {
    const results = await this.productRepository
      .createQueryBuilder('p')
      .innerJoinAndMapMany(
        'p.likes',
        Like,
        'l',
        'l.productCode = p.id AND p.status = :pStatus AND l.status = :lStatus',
        { pStatus: ProductStatus.Active, lStatus: CommonStatus.Active },
      )
      .innerJoinAndMapOne(
        'l.user',
        User,
        'u',
        'u.id = l.memberId AND u.status = :uStatus AND u.id = :uMemberId',
        {
          uStatus: CommonStatus.Active,
          uMemberId: memberId,
        },
      )
      .select([
        'p.id',
        'p.productName',
        'p.priceEach',
        'p.soldQuantity',
        'p.discount',
        'p.image',
      ])
      .getMany();
    return results;
  }

  async getInfoOrder(memberId: number) {
    const results = (await this.userRepository
      .createQueryBuilder('u')
      .leftJoinAndMapOne(
        'u.shop',
        UserShop,
        'us',
        'us.ownerId = u.id AND us.status = :usStatus',
        { usStatus: CommonStatus.Active },
      )
      .leftJoinAndMapMany('u.orders', Order, 'o', 'o.customerId = u.id')
      .leftJoinAndMapMany(
        'o.orderDetails',
        OrderDetail,
        'od',
        'od.orderId = o.id',
      )
      .leftJoinAndMapOne(
        'od.product',
        Product,
        'p',
        'p.id = od.productCode AND p.status = :pStatus',
        { pStatus: ProductStatus.Active },
      )
      .leftJoinAndMapOne(
        'p.judge',
        Judge,
        'j',
        'j.productCode = p.id AND j.status = :jStatus AND j.memberId = :jMemberId',
        {
          jStatus: CommonStatus.Active,
          jMemberId: memberId,
        },
      )
      .leftJoinAndMapOne(
        'p.shop',
        UserShop,
        'us1',
        'us1.id = p.sellerId AND us1.status = :us1Status',
        { us1Status: CommonStatus.Active },
      )
      .select([
        'u.id',
        'u.email',
        'u.username',
        'u.image',
        'us.id',
        'us.shopName',
        'o.id',
        'o.orderedAt',
        'o.deletedAt',
        'o.deliveredAt',
        'o.shippedAt',
        'o.address',
        'o.status',
        'od.id',
        'od.quantityOrder',
        'od.priceEach',
        'p.id',
        'p.productName',
        'p.quantityInStock',
        'p.priceEach',
        'p.image',
        'p.origin',
        'p.discount',
        'p.soldQuantity',
        'us1.id',
        'us1.shopName',
        'j.id',
      ])
      .where('u.id = :memberId', { memberId: memberId })
      .getOne()) as any;
    const allOrders = {
      deletedOrders: [],
      deliveringOrders: [],
      waitingForDeliveringProducts: [],
      deliveredProducts: [],
    };
    results?.['orders'].forEach((order) => {
      order.orderDetails.forEach((orderDetail) => {
        orderDetail.orderId = order.id;
        if (order.status == OrderStatus.Deleted && orderDetail.product) {
          allOrders.deletedOrders.push(orderDetail);
        } else if (
          order.status == OrderStatus.Delivering &&
          orderDetail.product
        ) {
          allOrders.deliveringOrders.push(orderDetail);
        } else if (
          order.status == OrderStatus.Preparing &&
          orderDetail.product
        ) {
          allOrders.waitingForDeliveringProducts.push(orderDetail);
        } else if (order.status == OrderStatus.Shipped && orderDetail.product) {
          allOrders.deliveredProducts.push(orderDetail);
        }
      });
    });
    results.orders = allOrders;
    results.shop = !results.shop ? {} : results.shop;
    return results;
  }

  async listSearchProducts(keywords: string) {
    const entityManager = getManager();
    const query = `SELECT DISTINCT product_name as productName FROM product WHERE product_name LIKE "%${keywords}%"`;
    return entityManager.query(query, []);
  }

  async searchProducts(keywords: string) {
    return this.productRepository.find({
      where: {
        productName: keywords,
      },
    });
  }

  async getAllProductsInShop(memberId) {
    const results = this.productRepository
      .createQueryBuilder('p')
      .leftJoinAndMapMany(
        'p.judges',
        Judge,
        'j',
        'p.id = j.productCode AND j.status = :jStatus',
        { jStatus: CommonStatus.Active },
      )
      .innerJoinAndMapOne(
        'p.shop',
        UserShop,
        'us',
        'us.id = p.sellerId AND us.status = :usStatus',
        { usStatus: CommonStatus.Active },
      )
      .innerJoinAndMapOne(
        'us.member',
        User,
        'u',
        'u.id = us.ownerId AND u.status = :uStatus AND u.id = :memberId',
        { uStatus: CommonStatus.Active, memberId: memberId },
      )
      .leftJoinAndMapMany(
        'p.otherImages',
        Image,
        'i',
        'i.productCode = p.id AND i.status = :iStatus',
        { iStatus: CommonStatus.Active },
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
        'i.name',
        'i.id',
      ])
      .where('p.status = :pStatus', { pStatus: ProductStatus.Active });
    return results.orderBy('p.id', 'DESC').getMany();
  }

  async uploadProductImage(file: Express.Multer.File) {
    try {
      if (!file || Object.keys(file).length === 0) {
        return { msg: 'No Files are Selected.' };
      }
      if (file.size > 1024 * 1024) {
        // this.removeTmp(file.tempFilePath);
        return { msg: 'File size is to Large.' };
      }
      if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
        // this.removeTmp(file.tempFilePath);
        return { msg: 'File Format is Incorrect.' };
      }
      return cloudinary.v2.uploader.upload(
        file.path,
        { folder: 'multivendor-shop' },
        async (err, result) => {
          fs.unlinkSync('./' + file.path);
          if (err) {
            console.log(err);
            throw err;
          }
          return {
            public_id: result.public_id,
            url: result.secure_url,
          };
        },
      );
    } catch (error) {
      throw new Exception(ErrorCode.Permisstion_Denied, error.message);
    }
  }
  removeTmp = (path) => {
    fs.unlink(path, (err) => {
      if (err) throw err;
    });
  };
}
