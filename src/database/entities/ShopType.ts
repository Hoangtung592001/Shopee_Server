import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'shop_types' })
export default class ShopType {
  @PrimaryGeneratedColumn({ name: 'shop_type_id', type: 'int', unsigned: true })
  shopTypeId: number;
  @Column({ name: 'shop_name', type: 'varchar', length: 255 })
  shopName: string;
}
