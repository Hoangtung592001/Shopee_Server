import { Injectable } from '@nestjs/common';
import {
  IInfoProduct,
  IPrePayload,
  IProduct,
  IProductFull,
  IProductLineList,
  IProductList,
  IRawProduct,
} from '$types/interfaces';
import { Connection, Repository } from 'typeorm';
import Product from '$database/entities/Product';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '$shared/auth/auth.service';
import { compare, hash } from 'bcrypt';
import { Exception, Unauthorized } from '$helpers/exception';
import { ErrorCode } from '$types/enums';
import config from '$config';
import { JwtService } from '@nestjs/jwt';
import { SearchIndex } from '$types/enums';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import OrderCart from '$database/entities/OrderCart';
import { OrderProductDto } from './dto/OrderProduct.dto';
import { AddProductsToCartDto } from './dto/AddProductToCart.dto';

@Injectable()
export class OrderCartService {
  constructor(
    private readonly connection: Connection,
    private readonly authService: AuthService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(OrderCart)
    private readonly orderCartRepository: Repository<OrderCart>,
  ) {}

  async addProductsToCart(memberId: number, product: AddProductsToCartDto) {
    try {
      const productInDb = await this.productRepository.findOne({
        where: { id: product.productCode },
      });
      if (!!!productInDb) {
        throw new Exception(ErrorCode.Product_Not_Found, 'Product not found!');
      }
      if (productInDb.quantityInStock < product.quantityOrder) {
        throw new Exception(
          ErrorCode.Quantity_Invalid,
          'Quantity you want is invalid!',
        );
      }
      const addingProduct = {
        customerId: memberId,
        priceEach: productInDb.priceEach,
        ...product,
      };
      return this.orderCartRepository.save(addingProduct);
    } catch (error) {
      throw new Exception(ErrorCode.Unknown_Error, error.message);
    }
  }

  async deleteProductFromCart(memberId: number, orderId: number) {
    try {
      const orderInCart = await this.orderCartRepository
        .createQueryBuilder('oc')
        .andWhere('oc.customer_id = :memberId AND order_id = :orderId', {
          memberId: memberId,
          orderId: orderId,
        })
        .getOne();
      if (orderInCart.customerId !== memberId) {
        throw new Exception(
          ErrorCode.Unauthorized,
          'You are not author of this order!',
        );
      }

      return await this.orderCartRepository.save({
        ...orderInCart,
        status: 0,
      });
    } catch (error) {
      throw new Exception(ErrorCode.Unknown_Error, error.message);
    }
  }

  async getAllOrderInCart(memberId: number) {
    try {
      return this.orderCartRepository
        .createQueryBuilder('oc')
        .innerJoinAndSelect('oc.product', 'product')
        .where('oc.customer_id = :memberId AND status = 1', {
          memberId: memberId,
        })
        .getOne();
    } catch (error) {
      throw new Exception(ErrorCode.Unknown_Error, error.message);
    }
  }

  async changeQuantityOrderOfProductInCart(
    memberId: number,
    productCode: number,
    quantity: number,
  ) {
    try {
      const productInCartInDb = await this.orderCartRepository
        .createQueryBuilder('oc')
        .innerJoinAndSelect('oc.product', 'product')
        .where('oc.customer_id = :memberId AND status = 1 AND oc.productCode: productCode', {
          memberId: memberId,
          productCode: productCode
        })
        .getOne();
      if (productInCartInDb.product.quantityInStock < quantity) {
        throw new Exception(
          ErrorCode.Quantity_Invalid,
          'Quantity you want is invalid!',
        );
      }
      productInCartInDb.quantityOrder = quantity;
      return this.orderCartRepository.save(productInCartInDb);
    } catch (error) {
      throw new Exception(ErrorCode.Unknown_Error, error.message);
    }
  }
}
