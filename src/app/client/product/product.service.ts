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
export class ProductService {
  constructor(
    private readonly connection: Connection,
    private readonly authService: AuthService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(OrderCart)
    private readonly orderCartRepository: Repository<OrderCart>,
  ) {}

  async getAllProducts(): Promise<IProductList> {
    const products =
      (await this.productRepository.find()) as unknown as IProductList;
    return products;
  }

  async addProduct(
    product: IProduct,
    user: IPrePayload,
  ): Promise<IProductFull> {
    try {
      const savingProduct = {
        ...product,
        sellerId: +user.id,
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

  async getProduct(id: number): Promise<IProductFull> {
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

  async deleteProduct(id: number, user: IPrePayload): Promise<any> {
    try {
      const product = await this.productRepository.delete({ id: id });
      return product;
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
  ): Promise<IProductFull> {
    try {
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
        ...product,
      };
      return this.orderCartRepository.save(addingProduct as any as Product);
    } catch (error) {
      throw new Exception(ErrorCode.Unknown_Error, error.message);
    }
  }

  async orderProducts(memberId: number, body: OrderProductDto) {
    const productCodes = body.products.map((product) => {
      return product.productCode;
    });
    const products = await this.productRepository
      .createQueryBuilder('q')
      .where('q.id IN (:productCodes)', {
        productCodes: productCodes,
      })
      .getMany();
    let isMatchedQuantity = true;
    for (var i = 0; i < products.length; i++) {
      if (body.products[i].quantityOrder > products[i].quantityInStock) {
         
      }
    }
    return products;
  }
}
