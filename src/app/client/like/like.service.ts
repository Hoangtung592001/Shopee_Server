import { Injectable } from '@nestjs/common';
import { IProductLineList, IProductList } from '$types/interfaces';
import { Connection, Repository } from 'typeorm';
import { AuthService } from '$shared/auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import Like from '$database/entities/Like';

@Injectable()
export class LikeService {
  constructor(
    private readonly connection: Connection,
    private readonly authService: AuthService,
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}
  /**
   * Like and Unlike here
   */
  async likeProduct(memberId: number, productCode: number) {
    const isLiked = await this.likeRepository
      .createQueryBuilder('l')
      .where('l.member_id = :memberId AND l.product_code = :productCode', {
        memberId: memberId,
        productCode: productCode,
      })
      .orderBy('l.created_at', 'DESC')
      .limit(1)
      .getOne();
    if (!!!isLiked || isLiked.status == 0) {
      await this.likeRepository.save({
        memberId: memberId,
        productCode: productCode,
      });
    } else {
      isLiked.status = 0;
      await this.likeRepository.save(isLiked);
    }

    return {
      success: true,
    };
  }

  async getNumberOfLikes(productCode: number) {
    const queryBuilder = await this.likeRepository
      .createQueryBuilder('l')
      .select('count(l.id) as amountOfLikes')
      .where('l.product_code = :productCode AND status = 1', {
        productCode: productCode,
      })
      .getRawOne(); 
    return queryBuilder.amountOfLikes;
  }
}
