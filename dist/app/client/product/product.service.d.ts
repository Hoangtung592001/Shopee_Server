/// <reference types="multer" />
import { IInfoProduct, IPrePayload, IProduct } from '$types/interfaces';
import { Connection, Repository } from 'typeorm';
import Product from '$database/entities/Product';
import { AuthService } from '$shared/auth/auth.service';
import OrderCart from '$database/entities/OrderCart';
import { loadMoreFindAllMemberModelDto, TypeProducts } from './dto/GetAllProductsDto';
import UserShop from '$database/entities/UserShop';
import User from '$database/entities/User';
import ProductRecent from '$database/entities/ProductRecent';
import Judge from '$database/entities/Judge';
import Like from '$database/entities/Like';
import Image from '$database/entities/Image';
export declare class ProductService {
    private readonly connection;
    private readonly authService;
    private readonly productRepository;
    private readonly orderCartRepository;
    private readonly userShopRepository;
    private readonly userRepository;
    private readonly productRecentRepository;
    private readonly judgeRepository;
    private readonly likeRepository;
    private readonly imageRepository;
    constructor(connection: Connection, authService: AuthService, productRepository: Repository<Product>, orderCartRepository: Repository<OrderCart>, userShopRepository: Repository<UserShop>, userRepository: Repository<User>, productRecentRepository: Repository<ProductRecent>, judgeRepository: Repository<Judge>, likeRepository: Repository<Like>, imageRepository: Repository<Image>);
    getAllProducts(params: TypeProducts): Promise<Product[]>;
    addProduct(product: IProduct, user: IPrePayload): Promise<{
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
    } & Product>;
    getProduct(id: number): Promise<Product>;
    getProducByUser(userId: number, productId: number): Promise<Product>;
    deleteProduct(id: number, user: IPrePayload): Promise<{
        success: boolean;
    }>;
    changeInfoProduct(productId: number, productInfo: IInfoProduct, memberId: number): Promise<{
        success: boolean;
    }>;
    recentVisited(memberId: number, productCode: number): Promise<{
        visitorId: number;
        productCode: number;
    } & ProductRecent>;
    getRecentVisitedProduct(memberId: number, params: loadMoreFindAllMemberModelDto): Promise<Product[]>;
    getLikedProducts(memberId: number): Promise<Product[]>;
    getInfoOrder(memberId: number): Promise<any>;
    listSearchProducts(keywords: string): Promise<any>;
    searchProducts(keywords: string): Promise<Product[]>;
    getAllProductsInShop(memberId: any): Promise<Product[]>;
    uploadProductImage(file: Express.Multer.File): Promise<any>;
    removeTmp: (path: any) => void;
}
