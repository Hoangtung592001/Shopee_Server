import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '$shared/auth/auth.module';
import Notification from '$database/entities/Notification';
import User from '$database/entities/User';
import Order from '$database/entities/Order';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, User, Order]), AuthModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
