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
    otherPhotos: [];
    origin: string;
    discount: number;
    shopTypeId: number;
    description: string;
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
    shopTypeId?: number;
    otherImages: [];
}
export interface IProductList extends Array<IProduct> {
}
export interface IProductLine {
    productLine: string;
}
export interface IProductLineList extends Array<IProductLine> {
}
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
export interface IReturnOrders {
    orderId: number;
    status: number;
    productImage: string;
    productStatus: number;
    shopImage: string;
    priceEach: number;
    quantity: number;
    productName: string;
    shopName: string;
    shopId: number;
    productCode: number;
}
export interface IReturnOrderCart {
    productImage: string;
    productStatus: number;
    shopId: number;
    shopImage: string;
    quantity: number;
    orderCartId: number;
    productCode: string;
    shopName: string;
    productName: string;
    priceEach: number;
}
