/// <reference types="multer" />
import { ProductService } from './product.service';
import { IUserReq, IInfoProduct } from '$types/interfaces';
import { Request } from 'express';
import { loadMoreFindAllMemberModelDto, TypeProducts } from './dto/GetAllProductsDto';
import { SearchProductsDto } from './dto/SearchProduct.dto';
interface IIdParam {
    id: string;
}
export declare const storage: {
    storage: import("multer").StorageEngine;
};
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    uploadProductImage(file: Express.Multer.File): Promise<any>;
    getAllProducts(req: Request, query: TypeProducts): Promise<import("../../../database/entities/Product").default[]>;
    addProduct(req: IUserReq): Promise<{
        sellerId: number;
        productName: string;
        productLine: number;
        quantityInStock: number;
        priceEach: number;
        image: string;
        origin: string;
        discount: number;
        shopTypeId: number;
        description: string;
    } & import("../../../database/entities/Product").default>;
    getProduct(id: number): Promise<import("../../../database/entities/Product").default>;
    getProductByUser(member: Express.User, id: number): Promise<import("../../../database/entities/Product").default>;
    forceDeleteProduct(params: any, req: IUserReq): Promise<{
        success: boolean;
    }>;
    userDeleteProduct(params: IIdParam, req: IUserReq): Promise<{
        success: boolean;
    }>;
    changeInfoProduct(body: IInfoProduct, params: any, member: Express.User): Promise<{
        success: boolean;
    }>;
    recentVisited(member: Express.User, id: string): Promise<{
        visitorId: number;
        productCode: number;
    } & import("../../../database/entities/ProductRecent").default>;
    getAllProductsInShop(member: Express.User): Promise<import("../../../database/entities/Product").default[]>;
    getAllProductsInShopPublic(memberId: number): Promise<import("../../../database/entities/Product").default[]>;
    getRecentVisitedProduct(member: Express.User, query: loadMoreFindAllMemberModelDto): Promise<import("../../../database/entities/Product").default[]>;
    getLikedProducts(member: Express.User): Promise<import("../../../database/entities/Product").default[]>;
    getInfoOrder(member: Express.User): Promise<any>;
    listSearchProducts(query: SearchProductsDto): Promise<any>;
    searchProducts(query: SearchProductsDto): Promise<import("../../../database/entities/Product").default[]>;
}
export {};
