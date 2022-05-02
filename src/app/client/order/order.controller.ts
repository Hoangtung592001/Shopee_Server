import { UserData } from '$core/decorators/user.decorator';
import {
  Body,
  Controller, Get, Param, Post,
} from '@nestjs/common';
import { OrderProductDto } from './dto/OrderProductDto.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getOrders(@UserData() member: Express.User) {
    return this.orderService.getOrders(member.id);
  }

  @Post()
  orderProducts(@UserData() member: Express.User, @Body() body: OrderProductDto) {
    return this.orderService.orderProduct(member.id, body);
  }
}
