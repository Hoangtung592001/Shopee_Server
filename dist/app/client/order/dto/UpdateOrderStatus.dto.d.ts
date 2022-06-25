import { OrderStatus } from '$types/enums';
export interface UpdateOrderStatus {
    orderId: number;
    status: OrderStatus;
}
