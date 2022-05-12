import { UserData } from '$core/decorators/user.decorator';
import { assignLoadMore } from '$helpers/utils';
import {
  Body,
  Controller, Get, Param, Post, Query,
} from '@nestjs/common';
import { LoadMoreOrderDto } from './dto/LoadMoreOrderDto.dto';
import { OrderProductDto } from './dto/OrderProductDto.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getOrders(@UserData() member: Express.User, @Query() query: LoadMoreOrderDto) {
    assignLoadMore(query);
    return this.orderService.getOrders(member.id, query);
  }

  @Post()
  orderProducts(@UserData() member: Express.User, @Body() body: OrderProductDto) {
    return this.orderService.orderProduct(member.id, body);
  }
}
