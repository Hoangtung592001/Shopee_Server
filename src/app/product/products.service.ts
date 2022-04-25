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

@Injectable()
export class ProductService {
  constructor(
    private readonly connection: Connection,
    private readonly authService: AuthService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
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
    user: IPrePayload
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

  // async searchProduct(
  //   query: string
  // ) {
  //   const response = this.elasticsearchService.index({
  //     index: SearchIndex.Product,
  //     body: {

  //     }
  //   });
  // }
}
