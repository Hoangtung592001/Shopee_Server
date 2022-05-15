import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Put,
  Query,
} from '@nestjs/common';
import { OrderCartService } from './order-cart.service';
import { IUserReq, IProduct, IInfoProduct } from '$types/interfaces';
import { Public } from '$core/decorators/public.decorator';
import { Request } from 'express';
import { Roles } from '$core/decorators/roles.decorator';
import { Role } from '$types/enums';
import { UserData } from '$core/decorators/user.decorator';
import { OrderProductDto } from './dto/OrderProduct.dto';
import { AddProductsToCartDto } from './dto/AddProductToCart.dto';
import { ChangeQuantityOrder } from './dto/ChangeQuantityOrder';
import { GetOrderCartDto } from './dto/GetOrderCartDto.dto';
import { assignLoadMore } from '$helpers/utils';

@Controller('order-cart')
export class OrderCartController {
  constructor(private readonly orderCartService: OrderCartService) {}

  @Post('add-products-to-cart')
  addProductsToCart(
    @UserData() member: Express.User,
    @Body() body: AddProductsToCartDto,
  ) {
    return this.orderCartService.addProductsToCart(member.id, body);
  }

  @Delete('delete-from-cart/:id')
  deleteFromCart(
    @UserData() member: Express.User,
    @Param('id') orderId: string,
  ) {
    return this.orderCartService.deleteProductFromCart(member.id, +orderId);
  }

  @Get('get-all-products-in-cart')
  getAllInCart(
    @UserData() member: Express.User,
    @Query() query: GetOrderCartDto,
  ) {
    assignLoadMore(query);
    return this.orderCartService.getAllOrderInCart(member.id, query);
  }

  @Put('change-quantity-products')
  changeQuantityProducts(
    @UserData() member: Express.User,
    @Body() body: ChangeQuantityOrder,
  ) {
    return this.orderCartService.changeQuantityOrderOfProductInCart(
      member.id,
      body.productCode,
      body.quantity,
    );
  }
}
