import { OrderStatus } from '$types/enums';

export interface ISendNotificationBody {
  receiverId: number;
  orderId: number;
  status: OrderStatus;
}
