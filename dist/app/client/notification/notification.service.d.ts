import { Connection, Repository } from 'typeorm';
import { AuthService } from '$shared/auth/auth.service';
import Notification from '$database/entities/Notification';
import { ISendNotificationBody } from './dto/sendNotification';
import Order from '$database/entities/Order';
export declare class NotificationService {
    private readonly connection;
    private readonly authService;
    private readonly notificationRepository;
    private readonly orderRepository;
    constructor(connection: Connection, authService: AuthService, notificationRepository: Repository<Notification>, orderRepository: Repository<Order>);
    adminGetAllNotifications(): Promise<Notification[]>;
    getNotifications(userId: number): Promise<Notification[]>;
    sendNotification(memberId: number, body: ISendNotificationBody): Promise<import("typeorm").InsertResult>;
}
