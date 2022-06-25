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
import { ProductLineService } from './productlines.service';
import {
} from '$types/interfaces';
import { Public } from '$core/decorators/public.decorator';

@Controller('product-line')
export class ProductLineController {
  constructor(private readonly productLineService: ProductLineService) {}

  @Public()
  @Get('get-all-product-lines')
  async getAllProductLines() {
    return await this.productLineService.getAllProductLines();
  }
}
