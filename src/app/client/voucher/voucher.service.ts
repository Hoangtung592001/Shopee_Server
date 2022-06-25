import { Injectable } from '@nestjs/common';
import { IProductLineList, IProductList } from '$types/interfaces';
import { Connection, Repository } from 'typeorm';
import ProductLine from '$database/entities/ProductLine';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '$shared/auth/auth.service';
import Voucher from '$database/entities/Voucher';

@Injectable()
export class VoucherService {
  constructor(
    private readonly connection: Connection,
    private readonly authService: AuthService,
    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>,
  ) {}
  
  async getAllVouchers(memberId: number) {
    return this.voucherRepository.find({ where: { memberId: memberId, status: 1 }});
  }
}