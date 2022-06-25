import { NotificationService } from './notification.service';
import { IUserReq } from '$types/interfaces';
import { ISendNotificationBody } from './dto/sendNotification';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    adminGetAllNotifications(): Promise<import("../../../database/entities/Notification").default[]>;
    getNotifications(req: IUserReq): Promise<import("../../../database/entities/Notification").default[]>;
    sendNotification(member: Express.User, body: ISendNotificationBody): Promise<import("typeorm").InsertResult>;
}
