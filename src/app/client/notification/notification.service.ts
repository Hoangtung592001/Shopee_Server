import { Injectable } from '@nestjs/common';
import { IPrePayload } from '$types/interfaces';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '$shared/auth/auth.service';
import Notification from '$database/entities/Notification';
import { ISendNotificationBody } from './dto/sendNotification';
import OrderDetail from '$database/entities/OrderDetail';
import Product from '$database/entities/Product';
import { CommonStatus, ErrorCode, ProductStatus } from '$types/enums';
import UserShop from '$database/entities/UserShop';
import { Exception } from '$helpers/exception';
import Order from '$database/entities/Order';
import User from '$database/entities/User';
@Injectable()
export class NotificationService {
  constructor(
    private readonly connection: Connection,
    private readonly authService: AuthService,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async adminGetAllNotifications() {
    return this.notificationRepository.find();
  }

  async getNotifications(userId: number) {
    return this.notificationRepository
      .createQueryBuilder('n')
      .innerJoinAndMapOne(
        'n.member',
        User,
        'u',
        'u.id = n.receiverId AND u.status = :uStatus',
        { uStatus: CommonStatus.Active },
      )
      .where('n.receiverId = :userId', { userId: userId })
      .orderBy('n.id', 'DESC')
      .getMany();
  }

  async sendNotification(memberId: number, body: ISendNotificationBody) {
    const isOwner = await this.orderRepository
      .createQueryBuilder('o')
      .innerJoinAndMapMany(
        'o.orderDetails',
        OrderDetail,
        'od',
        'o.id = od.orderId',
      )
      .innerJoinAndMapOne(
        'od.product',
        Product,
        'p',
        'p.id = od.productCode AND p.status = :pStatus',
        { pStatus: ProductStatus.Active },
      )
      .innerJoinAndMapOne(
        'p.shop',
        UserShop,
        'us',
        'us.id = p.sellerId AND us.status = :usStatus AND us.ownerId = :usOwnerId',
        {
          usStatus: CommonStatus.Active,
          usOwnerId: memberId,
        },
      )
      .where('o.id = :oOrderId', {
        oOrderId: body.orderId,
      })
      .getMany();

    if (isOwner.length == 0) {
      throw new Exception(
        ErrorCode.Permisstion_Denied,
        'You are not owner of this orders',
      );
    }

    return this.notificationRepository.insert({
      orderId: body.orderId,
      receiverId: body.receiverId,
      notificationTypeId: body.status,
    });
  }
}
