import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';
import NotificationType from './NotificationType';
import TransferringMethod from './TransferringMethod';
@Entity({ name: 'notification' })
export default class Notification {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @Column({ name: 'title', type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({
    name: 'parcel_code',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  parcelCode: string;

  @Column({
    name: 'transferring_code',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  transferringCode: string;

  @Column({
    name: 'transferring_method_id',
    type: 'int',
    unsigned: true,
  })
  transferringMethodId: number;

  @ManyToOne(() => TransferringMethod)
  @JoinColumn({ name: 'transferring_method_id', referencedColumnName: 'id' })
  transferringMethod: TransferringMethod;

  @Column({
    name: 'receiver_id',
    type: 'bigint',
    unsigned: true,
    nullable: false,
  })
  receiverId: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: string | Date;

  @CreateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: string | Date;

  @Column({ name: 'notification_type_id', type: 'int', unsigned: true })
  notificationTypeId: number;

  @ManyToOne(() => NotificationType)
  @JoinColumn({ name: 'notification_type_id', referencedColumnName: 'id' })
  notificationType: NotificationType;

  @Column({
    name: 'image',
    type: 'varchar',
    length: 1000,
    nullable: false,
  })
  image: string;

  /* -------------------------------------------------------------------------- */
  /*                                  Relation                                  */
  /* -------------------------------------------------------------------------- */

  @ManyToOne(() => User)
  @JoinColumn({ name: 'receiver_id', referencedColumnName: 'id' })
  receiver: User;
}
