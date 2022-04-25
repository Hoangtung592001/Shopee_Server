import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Notification from '$database/entities/Notification';

@Entity({ name: 'notification_type' })
export default class NotificationType {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
    unsigned: true,
  })
  id: number;

  @OneToMany(
    () => Notification,
    (Notification) => Notification.notificationType,
  )
  Notifications: Notification[];

  @Column({ name: 'notification_name', type: 'varchar', length: 255 })
  methodName: string;
}
