import { LoadMoreOrderDto } from './dto/LoadMoreOrderDto.dto';
import { OrderProductDto } from './dto/OrderProductDto.dto';
import { UpdateOrderStatus } from './dto/UpdateOrderStatus.dto';
import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    orderInShop(member: Express.User): Promise<import("../../../database/entities/Order").default[]>;
    getOrders(member: Express.User, query: LoadMoreOrderDto): Promise<{}>;
    orderProducts(member: Express.User, body: OrderProductDto): Promise<{
        success: boolean;
    }>;
    updateOrderStatusByOwner(member: Express.User, body: UpdateOrderStatus): Promise<import("typeorm").UpdateResult>;
    updateOrderStatusByUser(member: Express.User, body: UpdateOrderStatus): Promise<import("typeorm").UpdateResult>;
}
