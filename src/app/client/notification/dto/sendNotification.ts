export interface ISendNotificationBody {
    title: string;
    parcelCode: string;
    transferringCode: string;
    transferringMethodId: number;
    notificationTypeId: number;
    image: string;
}