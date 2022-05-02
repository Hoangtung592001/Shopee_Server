import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import UserShop from './UserShop';

@Entity({ name: 'user_shop_type' })
export default class UserShopType {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id: number;

  @Column({ name: 'shop_name', type: 'varchar', length: 255 })
  shopName: string;

  @OneToMany(() => UserShop, (userShop) => userShop.shopType)
  shops: UserShop[];
}
