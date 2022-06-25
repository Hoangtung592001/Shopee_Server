import { CommonStatus } from '$types/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Order from './Order';
@Entity({ name: 'voucher' })
export default class Like {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @Column({ name: 'member_id', type: 'bigint', unsigned: true })
  memberId: number;

  @Column({ name: 'value', type: 'double', unsigned: true })
  value: number;

  @Column({
    name: 'status',
    type: 'tinyint',
    unsigned: true,
    comment: '0: Inactive 1: Active',
    default: CommonStatus.Active,
  })
  status: number;

  @CreateDateColumn({ name: 'used_at', type: 'datetime' })
  usedAt: string | Date;

  @CreateDateColumn({ name: 'started_at', type: 'datetime' })
  startedAt: string | Date;

  @CreateDateColumn({ name: 'expired_at', type: 'datetime' })
  expiredAt: string | Date;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: string | Date;

  @OneToMany(() => Order, (order) => order.voucher)
  order: Order[];
}
