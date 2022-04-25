import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Notification from '$database/entities/Notification';

@Entity({ name: 'transferring_method' })
export default class TransferringMethod {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
    unsigned: true,
  })
  id: number;

  @OneToMany(
    () => Notification,
    (Notification) => Notification.transferringMethod,
  )
  Notifications: Notification[];

  @Column({ name: 'method_name', type: 'varchar', length: 255 })
  methodName: string;
}
