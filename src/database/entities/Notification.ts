import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from '$types/enums';
@Entity({ name: 'notification' })
export default class Notification {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @Column({
    name: 'order_id',
    type: 'bigint',
    nullable: false,
  })
  orderId: number;

  @Column({
    name: 'receiver_id',
    type: 'bigint',
    unsigned: true,
    nullable: false,
  })
  receiverId: number;

  @Column({ name: 'notification_type_id', type: 'tinyint', unsigned: true })
  notificationTypeId: OrderStatus;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: string | Date;

  @CreateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: string | Date;
}
