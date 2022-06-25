import { OrderStatus, TransferringMethodStatus } from '$types/enums';
import { number } from 'joi';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import OrderDetail from './OrderDetail';
import TransferringMethod from './TransferringMethod';

import Voucher from './Voucher';
@Entity({ name: 'order' })
export default class Order {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @CreateDateColumn({ name: 'ordered_at', type: 'datetime', nullable: false })
  orderedAt: string | Date;

  @CreateDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt: string | Date;

  @CreateDateColumn({ name: 'delivered_at', type: 'datetime', nullable: true })
  deliveredAt: string | Date;

  @CreateDateColumn({ name: 'shipped_at', type: 'datetime', nullable: true })
  shippedAt: string | Date;

  @Column({
    name: 'status',
    type: 'tinyint',
    nullable: false,
    default: OrderStatus.Preparing,
    comment: '0: deleted 1: Preparing, 2: Delivering, 3: Shipped',
  })
  status: number;

  @Column({ name: 'address', type: 'varchar', length: 1000, nullable: false })
  address: string;

  @Column({
    name: 'receiver_name',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  receiverName: string;

  @Column({ name: 'phone', type: 'varchar', length: 20, nullable: false })
  phone: string;

  @Column({
    name: 'customer_id',
    type: 'bigint',
    unsigned: true,
    nullable: false,
  })
  customerId: number;

  @Column({
    name: 'voucher_id',
    type: 'bigint',
    unsigned: true,
    nullable: true,
  })
  voucherId: number;

  @Column({
    name: 'shipping_fee',
    type: 'double',
    unsigned: true,
    nullable: true,
  })
  shippingFee: number;

  /* -------------------------------------------------------------------------- */
  /*                                  Relation                                  */
  /* -------------------------------------------------------------------------- */

  @ManyToOne(() => Voucher)
  @JoinColumn({ name: 'voucher_id', referencedColumnName: 'id' })
  voucher: Voucher;

  @OneToMany(() => OrderDetail, (orderdetail) => orderdetail.order)
  orderdetails: OrderDetail[];
}
