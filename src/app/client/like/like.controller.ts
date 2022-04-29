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
} from '@nestjs/common';
import { LikeService } from './like.service';
import {
} from '$types/interfaces';
import { Public } from '$core/decorators/public.decorator';
import { UserData } from '$core/decorators/user.decorator';
import { LikeProductDto } from './dto/like-product.dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('like-product/:productCode')
  likeProduct(@UserData() member: Express.User, @Param('productCode') productCode: string) {
    return this.likeService.likeProduct(+member.id, +productCode);
  }

  @Public()
  @Get('number-of-likes/:productCode')
  getNumberOfLikes(@Param('productCode') productCode: string) {
    return this.likeService.getNumberOfLikes(+productCode);
  }
}
