import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { IUserReq } from '$types/interfaces';
import { Roles } from '$core/decorators/roles.decorator';
import { Role, TokenType } from '$types/enums';
import { ISendNotificationBody } from './dto/sendNotification';
import { UserData } from '$core/decorators/user.decorator';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Roles(Role.Admin)
  @Get('admin-get-all-notifications')
  async adminGetAllNotifications() {
    return this.notificationService.adminGetAllNotifications();
  }

  @Get('get-notifications')
  async getNotifications(@Req() req: IUserReq) {
    const { tokenType, ...user } = req.user;
    return this.notificationService.getNotifications(user.id);
  }

  @Post('send-notification')
  async sendNotification(
    @UserData() member: Express.User,
    @Body() body: ISendNotificationBody,
  ) {
    return this.notificationService.sendNotification(member.id, body);
  }
}
