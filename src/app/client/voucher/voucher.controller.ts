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
import { VoucherService } from './voucher.service';
import {
} from '$types/interfaces';
import { Public } from '$core/decorators/public.decorator';
import { UserData } from '$core/decorators/user.decorator';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Get('get-all-vouchers')
  getAllVouchers(@UserData() member: Express.User) {
    return this.voucherService.getAllVouchers(member.id);
  }
}
