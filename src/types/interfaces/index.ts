import { PartialType } from '@nestjs/mapped-types';
import { Request } from 'express';

export interface IPayload {
  id: number;
  role: string;
  tokenType: string;
}

export interface IPrePayload {
  id: number;
  role: string;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  email: string;
  password: string;
  username: string;
  dateOfBirth: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface ITokenStructure {
  refreshToken: string;
  accessToken: string;
}

export interface IUserReq extends Request {
  user: IPayload;
}

export interface IInputChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IRefreshTokenPakage {
  refreshToken: string;
}

export interface ITokenPayload {
  user: IPayload;
}

export interface IProduct {
  productName: string;
  productLine: number;
  quantityInStock: number;
  priceEach: number;
  image: string;
  origin: string;
  discount: number;
  soldQuantity: number;
  sellerEmail: string;
  shopTypeId: number;
}

export interface IProductFull {
  id: number;
  productName: string;
  productLine: number;
  quantityInStock: number;
  priceEach: number;
  image: string;
  origin: string;
  discount: number;
  soldQuantity: number;
  sellerId: number;
  shopTypeId: number;
}

export interface IRawProduct {
  productName: string;
  productLine: number;
  quantityInStock: number;
  priceEach: number;
  image: string;
  origin: string;
  discount: number;
  soldQuantity: number;
  shopTypeId: number;
}

export interface IInfoProduct {
  productName?: string;
  productLine?: number;
  quantityInStock?: number;
  priceEach?: number;
  image?: string;
  origin?: string;
  discount?: number;
  soldQuantity?: number;
  shopTypeId?: number;

}

export interface IProductList extends Array<IProduct> {}

export interface IProductLine {
  productLine: string;
  textDescription: string;
}

export interface purchasingProduct {
  productCode: string;
  quantityOrder: number;
  customerId: number;
}

export interface purchasingProductList extends Array<purchasingProduct> {}

export interface IProductLineList extends Array<IProductLine> {}

// Test Interface For Elastic Search
export interface PostSearchBody {
  id: number;
  title: string;
  content: string;
  authorId: number;
}

export interface PostSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: PostSearchBody;
    }>;
  };
}


