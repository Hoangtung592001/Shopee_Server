import { CommonStatus } from '$types/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Product from './Product';
import User from './User';
@Entity({ name: 'image' })
export default class Judge {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @Column({
    name: 'member_id',
    type: 'bigint',
    unsigned: true,
    nullable: false,
  })
  memberId: number;

  @Column({ name: 'product_code', type: 'int', unsigned: true })
  productCode: number;

  @Column({ name: 'content', type: 'varchar', length: 5000 })
  content: string;

  @Column({ name: 'stars', type: 'tinyint', unsigned: true })
  stars: number;

  @Column({
    name: 'status',
    type: 'int',
    unsigned: true,
    comment: '0: Inactive, 1: active',
    default: CommonStatus.Active,
  })
  status: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: string | Date;

  @CreateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: string | Date;

  /* -------------------------------------------------------------------------- */
  /*                                  Relation                                  */
  /* -------------------------------------------------------------------------- */
}
