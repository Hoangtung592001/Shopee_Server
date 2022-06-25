import { OrderStatus } from '$types/enums';
export default class Notification {
    id: number;
    orderId: number;
    receiverId: number;
    notificationTypeId: OrderStatus;
    createdAt: string | Date;
    updatedAt: string | Date;
}
