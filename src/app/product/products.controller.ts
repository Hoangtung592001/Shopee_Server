import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseFilters,
  ForbiddenException,
  ParseIntPipe,
  UsePipes,
  Req,
  Query,
} from '@nestjs/common';
import { ProductService } from './products.service';
import {
  IUserReq,
  IPayload,
  IInputChangePassword,
  IRefreshTokenPakage,
  IProduct,
  IRawProduct,
  IInfoProduct,
} from '$types/interfaces';
import { Public } from '$core/decorators/public.decorator';
import { Request } from 'express';
import { validate } from '$helpers/validate';
import { Roles } from '$core/decorators/roles.decorator';
import { Role, TokenType } from '$types/enums';

interface IIdParam {
  id: string;
}

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Get('get-all-products')
  async getAllProducts(@Req() req: Request) {
    return this.productService.getAllProducts();
  }

  @Post('add-products')
  async addProduct(@Req() req: IUserReq) {
    const body = req.body as IProduct;
    const { tokenType, ...user } = req.user;
    return await this.productService.addProduct(body, user);
  }

  @Public()
  @Get('get-product/:id')
  async getProduct(@Param() params) {
    return await this.productService.getProduct(params.id);
  }

  @Roles(Role.Admin)
  @Delete('force-delete-product/:id')
  async forceDeleteProduct(@Param() params, @Req() req: IUserReq) {
    const idProduct = params.id;
    const { tokenType, ...user } = req.user;
    return this.productService.deleteProduct(idProduct, user);
  }

  @Delete('user-delete-product/:id')
  async userDeleteProduct(@Param() params: IIdParam, @Req() req: IUserReq) {
    const idProduct = +params.id;
    const { tokenType, ...user } = req.user;
    return this.productService.deleteProduct(idProduct, user);
  }

  @Public()
  @Patch('change-product-info/:id')
  async changeInfoProduct(@Body() body: IInfoProduct, @Param() params, @Req() req: IUserReq) {
    const productId = +params.id;
    const productInfo = body;
    const { tokenType, ...user } = req.user;
    this.productService.changeInfoProduct(productId, productInfo, user);
  }
}
