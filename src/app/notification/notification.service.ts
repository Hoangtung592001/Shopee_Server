import { Injectable } from '@nestjs/common';
import { IPrePayload } from '$types/interfaces';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '$shared/auth/auth.service';
import Notification from '$database/entities/Notification';
import { ISendNotificationBody } from './dto/sendNotification';
@Injectable()
export class NotificationService {
  constructor(
    private readonly connection: Connection,
    private readonly authService: AuthService,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async adminGetAllNotifications() {
    return this.notificationRepository.find();
  }

  async getNotifications(userId: number) {
    return this.notificationRepository.find({ receiverId: userId });
  }

  async sendNotification(userId: number, body: ISendNotificationBody) {
    const sendingNotification = body as any;
    sendingNotification.receiverId = userId;
    this.notificationRepository.save(sendingNotification);
  } 
}
