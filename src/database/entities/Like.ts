import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Product from './Product';
@Entity({ name: 'like' })
export default class Like {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @Column({ name: 'member_id', type: 'bigint', unsigned: true })
  memberId: number;

  @Column({ name: 'product_code', type: 'int', unsigned: true })
  productCode: number;

  @Column({
    name: 'status',
    type: 'int',
    unsigned: true,
    comment: '0: Inactive, 1: active',
    default: 1,
  })
  status: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: string | Date;

  @CreateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: string | Date;

  /* -------------------------------------------------------------------------- */
  /*                                  Relation                                  */
  /* -------------------------------------------------------------------------- */

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_code', referencedColumnName: 'id' })
  product: Product;
}
