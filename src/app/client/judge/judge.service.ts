import { Injectable } from '@nestjs/common';
import { IProductLineList, IProductList } from '$types/interfaces';
import { Connection, Repository } from 'typeorm';
import { AuthService } from '$shared/auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import Judge from '$database/entities/Judge';
import Product from '$database/entities/Product';
import { PostJudgeDto } from './dto/post-judge.dto';
import { Exception } from '$helpers/exception';
import { ErrorCode, ProductStatus } from '$types/enums';
import { GetJudgeDto } from './dto/get-judge.dto';
import { returnLoadMore } from '$helpers/utils';

@Injectable()
export class JudgeService {
  constructor(
    private readonly connection: Connection,
    private readonly authService: AuthService,
    @InjectRepository(Judge)
    private readonly judgeRepository: Repository<Judge>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async postJudge(memberId: number, judge: PostJudgeDto) {
    const productInDb = await this.productRepository.findOne(judge.productCode);
    if (!!!productInDb || productInDb.status == ProductStatus.Deleted) {
      throw new Exception(ErrorCode.Not_Found, 'This product is deleted!');
    }

    return this.judgeRepository.save({
      memberId: memberId,
      productCode: judge.productCode,
      content: judge.content,
      stars: judge.stars
    });
  }

  async deleteJudge(memberId: number, judgeId: number) {
    const judge = await this.judgeRepository
      .createQueryBuilder('j')
      .where('j.member_id = :memberId AND j.id = :judgeId', {
        memberId: memberId,
        judgeId: judgeId,
      })
      .getOne();
    if (!!!judge) {
      throw new Exception(
        ErrorCode.Delete_Judge_Invalid,
        'You are not owner of this judge! Or There is no judge you want to delete!',
      );
    }
    await this.judgeRepository.delete(judge.id);
    return {
      success: true,
    };
  }

  async getAllJudgesOfProduct(productCode: number) {
    return this.judgeRepository
      .createQueryBuilder('j')
      .where('j.productCode = :productCode AND status = 1', {
        productCode: productCode,
      })
      .getMany();
  }

  async getJudge(memberId: number, params: GetJudgeDto) {
    const queryBuilder = this.judgeRepository.createQueryBuilder('j');
    if (params.takeAfter) {
      queryBuilder.andWhere('j.id < :takeAfter AND j.member_id = :memberId', {
        takeAfter: params.takeAfter,
        memberId: memberId,
      });
    }

    const results = await queryBuilder
      .orderBy('j.id', 'DESC')
      .take(params.pageSize)
      .getMany();

    return returnLoadMore(results, params);
  }
}
