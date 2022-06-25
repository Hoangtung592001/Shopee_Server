import { Connection, Repository } from 'typeorm';
import { AuthService } from '$shared/auth/auth.service';
import Order from '$database/entities/Order';
import OrderDetail from '$database/entities/OrderDetail';
import { OrderProductDto } from './dto/OrderProductDto.dto';
import Product from '$database/entities/Product';
import { OrderStatus } from '$types/enums';
import { LoadMoreOrderDto } from './dto/LoadMoreOrderDto.dto';
export declare class OrderService {
    private readonly connection;
    private readonly authService;
    private readonly orderRepository;
    private readonly orderdetailRepository;
    private readonly productRepository;
    constructor(connection: Connection, authService: AuthService, orderRepository: Repository<Order>, orderdetailRepository: Repository<OrderDetail>, productRepository: Repository<Product>);
    getOrders(memberId: number, params: LoadMoreOrderDto): Promise<{}>;
    orderProduct(memberId: number, body: OrderProductDto): Promise<{
        success: boolean;
    }>;
    orderInShop(memberId: number): Promise<Order[]>;
    updateStatusOrder(memberId: number, status: OrderStatus, orderId: number): Promise<import("typeorm").UpdateResult>;
    updateStatusOrderByUser(memberId: number, status: OrderStatus, orderId: number): Promise<import("typeorm").UpdateResult>;
}
