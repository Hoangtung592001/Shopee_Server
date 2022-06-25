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
  UploadedFile,
  UseInterceptors,
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
  TypeProducts,
} from './dto/GetAllProductsDto';
import { assignLoadMore, assignPaging } from '$helpers/utils';
import { SearchProductsDto } from './dto/SearchProduct.dto';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { of } from 'rxjs';

interface IIdParam {
  id: string;
}

export const storage = {
  storage: diskStorage({
    destination: './uploads/blog-entry-images',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

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
  @Post('upload-image-product')
  @UseInterceptors(FileInterceptor('image', storage))
  async uploadProductImage(@UploadedFile() file: Express.Multer.File) {
    return this.productService.uploadProductImage(file);
  }

  @Public()
  @Get('get-all-products')
  async getAllProducts(@Req() req: Request, @Query() query: TypeProducts) {
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

  @Get('get-product-by-user/:id')
  async getProductByUser(
    @UserData() member: Express.User,
    @Param('id') id: number,
  ) {
    return await this.productService.getProducByUser(member.id, id);
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

  @Patch('change-product-info/:id')
  async changeInfoProduct(
    @Body() body: IInfoProduct,
    @Param() params,
    @UserData() member: Express.User,
  ) {
    const productId = +params.id;
    const productInfo = body;
    return this.productService.changeInfoProduct(
      productId,
      productInfo,
      member.id,
    );
  }

  @Post('recent-visited/:id')
  recentVisited(@UserData() member: Express.User, @Param('id') id: string) {
    return this.productService.recentVisited(member.id, +id);
  }

  @Get('get-all-products-in-shop')
  getAllProductsInShop(@UserData() member: Express.User) {
    return this.productService.getAllProductsInShop(member.id);
  }

  @Public()
  @Get('get-all-products-in-shop-public/:memberId')
  getAllProductsInShopPublic(@Param('memberId') memberId: number) {
    return this.productService.getAllProductsInShop(memberId);
  }

  @Get('get-recent-visited')
  getRecentVisitedProduct(
    @UserData() member: Express.User,
    @Query() query: loadMoreFindAllMemberModelDto,
  ) {
    assignLoadMore(query);
    return this.productService.getRecentVisitedProduct(member.id, query);
  }

  @Get('get-liked-products')
  getLikedProducts(@UserData() member: Express.User) {
    return this.productService.getLikedProducts(member.id);
  }

  @Get('get-info-order')
  getInfoOrder(@UserData() member: Express.User) {
    return this.productService.getInfoOrder(member.id);
  }

  @Public()
  @Get('list-search-products')
  listSearchProducts(@Query() query: SearchProductsDto) {
    return this.productService.listSearchProducts(query.keywords);
  }

  @Public()
  @Get('search-products')
  searchProducts(@Query() query: SearchProductsDto) {
    return this.productService.searchProducts(query.keywords);
  }
}
