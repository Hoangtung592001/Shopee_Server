import { OrderCartService } from './order-cart.service';
import { AddProductsToCartDto } from './dto/AddProductToCart.dto';
import { ChangeQuantityOrder } from './dto/ChangeQuantityOrder';
import { GetOrderCartDto } from './dto/GetOrderCartDto.dto';
export declare class OrderCartController {
    private readonly orderCartService;
    constructor(orderCartService: OrderCartService);
    addProductsToCart(member: Express.User, body: AddProductsToCartDto): Promise<import("../../../database/entities/OrderCart").default>;
    deleteFromCart(member: Express.User, orderId: string): Promise<{
        status: import("$types/enums").CommonStatus;
        orderId: number;
        productCode: number;
        quantityOrder: number;
        customerId: number;
        createdAt: string | Date;
        deletedAt: string | Date;
        product: import("../../../database/entities/Product").default;
    } & import("../../../database/entities/OrderCart").default>;
    getAllInCart(member: Express.User, query: GetOrderCartDto): Promise<import("../../../database/entities/Product").default[]>;
    changeQuantityProducts(member: Express.User, body: ChangeQuantityOrder): Promise<import("../../../database/entities/OrderCart").default>;
}
