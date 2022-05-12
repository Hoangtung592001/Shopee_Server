import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { IUserReq, IProduct, IInfoProduct } from '$types/interfaces';
import { Public } from '$core/decorators/public.decorator';
import { Request } from 'express';
import { Roles } from '$core/decorators/roles.decorator';
import { Role } from '$types/enums';
import { UserData } from '$core/decorators/user.decorator';
import { OrderProductDto } from './dto/OrderProduct.dto';
import { AddProductsToCartDto } from './dto/AddProductToCart.dto';
import {
  FindAllMemberModelDto,
  loadMoreFindAllMemberModelDto,
} from './dto/GetAllProductsDto';
import { assignLoadMore, assignPaging } from '$helpers/utils';

interface IIdParam {
  id: string;
}

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @Public()
  // @Get('get-all-products')
  // async getAllProducts(@Req() req: Request, @Query() query: FindAllMemberModelDto) {
  //   assignPaging(query);
  //   return this.productService.getAllProducts(query);
  // }

  @Public()
  @Get('get-all-products')
  async getAllProducts(
    @Req() req: Request,
    @Query() query: loadMoreFindAllMemberModelDto,
  ) {
    assignLoadMore(query);
    return this.productService.getAllProducts(query);
  }

  @Post('add-products')
  async addProduct(@Req() req: IUserReq) {
    const body = req.body as IProduct;
    const { tokenType, ...user } = req.user;
    return await this.productService.addProduct(body, user);
  }

  @Public()
  @Get('get-product/:id')
  async getProduct(@Param('id') id: number) {
    return await this.productService.getProduct(id);
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
  async changeInfoProduct(
    @Body() body: IInfoProduct,
    @Param() params,
    @Req() req: IUserReq,
  ) {
    const productId = +params.id;
    const productInfo = body;
    const { tokenType, ...user } = req.user;
    this.productService.changeInfoProduct(productId, productInfo, user);
  }

  @Post('recent-visited/:id')
  recentVisited(@UserData() member: Express.User, @Param('id') id: string) {
    return this.productService.recentVisited(member.id, +id);
  }

  @Get('get-recent-visited')
  getRecentVisitedProduct(
    @UserData() member: Express.User,
    @Query() query: loadMoreFindAllMemberModelDto,
  ) {
    assignLoadMore(query);
    return this.productService.getRecentVisitedProduct(member.id, query);
  }
}
