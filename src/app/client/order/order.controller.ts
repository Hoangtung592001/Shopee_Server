import { UserData } from '$core/decorators/user.decorator';
import { assignLoadMore } from '$helpers/utils';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { LoadMoreOrderDto } from './dto/LoadMoreOrderDto.dto';
import { OrderProductDto } from './dto/OrderProductDto.dto';
import { UpdateOrderStatus } from './dto/UpdateOrderStatus.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('order-in-shop')
  orderInShop(@UserData() member: Express.User) {
    return this.orderService.orderInShop(member.id);
  }

  @Get()
  getOrders(
    @UserData() member: Express.User,
    @Query() query: LoadMoreOrderDto,
  ) {
    assignLoadMore(query);
    return this.orderService.getOrders(member.id, query);
  }

  @Post()
  orderProducts(
    @UserData() member: Express.User,
    @Body() body: OrderProductDto,
  ) {
    return this.orderService.orderProduct(member.id, body);
  }

  @Put('update-order-status-owner')
  updateOrderStatusByOwner(
    @UserData() member: Express.User,
    @Body() body: UpdateOrderStatus,
  ) {
    return this.orderService.updateStatusOrder(
      member.id,
      body.status,
      body.orderId,
    );
  }

  @Put('delete-order-user')
  updateOrderStatusByUser(
    @UserData() member: Express.User,
    @Body() body: UpdateOrderStatus,
  ) {
    return this.orderService.updateStatusOrderByUser(
      member.id,
      body.status,
      body.orderId,
    );
  }
}
