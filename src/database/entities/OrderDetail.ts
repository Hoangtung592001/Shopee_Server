import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Order from './Order';

@Entity({ name: 'order_detail' })
export default class OrderDetail {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @Column({ name: 'order_id', type: 'bigint', unsigned: true })
  orderId: number;

  @Column({
    name: 'product_code',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  productCode: string;

  @Column({
    name: 'quantity_order',
    type: 'int',
    unsigned: true,
    nullable: false,
  })
  quantityOrder: number;

  @Column({
    name: 'price_each',
    type: 'double',
    unsigned: true,
    nullable: false,
  })
  priceEach: number;

  /* -------------------------------------------------------------------------- */
  /*                                  Relation                                  */
  /* -------------------------------------------------------------------------- */

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;
}
