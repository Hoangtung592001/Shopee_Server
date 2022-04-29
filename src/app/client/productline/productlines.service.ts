import { Injectable } from '@nestjs/common';
import { IProductLineList, IProductList } from '$types/interfaces';
import { Connection, Repository } from 'typeorm';
import ProductLine from '$database/entities/ProductLine';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '$shared/auth/auth.service';

@Injectable()
export class ProductLineService {
  constructor(
    private readonly connection: Connection,
    private readonly authService: AuthService,
    @InjectRepository(ProductLine)
    private readonly productLineRepository: Repository<ProductLine>,
  ) {}
  async getAllProductLines(): Promise<IProductLineList> {
    return (await this.productLineRepository.find()) as IProductLineList;
  }
}
