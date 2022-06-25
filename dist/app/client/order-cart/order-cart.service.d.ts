import { Connection, Repository } from 'typeorm';
import Product from '$database/entities/Product';
import { AuthService } from '$shared/auth/auth.service';
import { CommonStatus } from '$types/enums';
import OrderCart from '$database/entities/OrderCart';
import { AddProductsToCartDto } from './dto/AddProductToCart.dto';
import { GetOrderCartDto } from './dto/GetOrderCartDto.dto';
import UserShop from '$database/entities/UserShop';
export declare class OrderCartService {
    private readonly connection;
    private readonly authService;
    private readonly productRepository;
    private readonly orderCartRepository;
    private readonly userShopRepository;
    constructor(connection: Connection, authService: AuthService, productRepository: Repository<Product>, orderCartRepository: Repository<OrderCart>, userShopRepository: Repository<UserShop>);
    addProductsToCart(memberId: number, product: AddProductsToCartDto): Promise<OrderCart>;
    deleteProductFromCart(memberId: number, orderId: number): Promise<{
        status: CommonStatus;
        orderId: number;
        productCode: number;
        quantityOrder: number;
        customerId: number;
        createdAt: string | Date;
        deletedAt: string | Date;
        product: Product;
    } & OrderCart>;
    getAllOrderInCart(memberId: number, params: GetOrderCartDto): Promise<Product[]>;
    changeQuantityOrderOfProductInCart(memberId: number, productCode: number, quantity: number): Promise<OrderCart>;
}
