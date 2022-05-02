import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Product from './Product';

@Entity({ name: 'orders_cart' })
export default class OrderCart {
  @PrimaryGeneratedColumn({ name: 'order_id', type: 'bigint', unsigned: true })
  orderId: number;

  @Column({
    name: 'product_code',
    type: 'bigint',
    nullable: false,
    unsigned: true,
  })
  productCode: number;

  @Column({
    name: 'quantity_order',
    type: 'int',
    unsigned: true,
    nullable: false,
  })
  quantityOrder: number;

  @Column({
    name: 'customer_id',
    type: 'bigint',
    unsigned: true,
    nullable: false,
  })
  customerId: number;

  @Column({
    name: 'status',
    type: 'tinyint',
    unsigned: true,
    default: 1,
    comment: '1: active 0: deleted',
  })
  status: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: string | Date;

  @CreateDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: string | Date;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_code', referencedColumnName: 'id' })
  product: Product;
}
