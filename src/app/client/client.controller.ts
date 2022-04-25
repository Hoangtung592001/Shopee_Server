import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseFilters, ForbiddenException, ParseIntPipe, UsePipes, Req } from '@nestjs/common';
import { purchasingProductList, IUserReq, IPayload, IInputChangePassword, IRefreshTokenPakage } from '$types/interfaces';
import { Public } from '$core/decorators/public.decorator';
import { Request } from 'express';
import{ Roles } from '$core/decorators/roles.decorator';
import { Role } from '$types/enums';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}
    @Get('get-personal-info')
    getPersonalInfo(@Req() req: IUserReq) {
        const { tokenType, ...user } = req.user;
        return this.clientService.getPersonalInfo(user);
    }
    
    @Post('add-products-to-cart')
    addProductsToCart(@Req() req: IUserReq, @Body() body: purchasingProductList) {
      const { tokenType, ...user } = req.user;
      const productList = body;
      const fullProductList = productList.map((orderedProduct) => {
        orderedProduct.customerId = user.id;
        return orderedProduct;
      });
      return this.clientService.addProductsToCart(fullProductList);
    }
}
