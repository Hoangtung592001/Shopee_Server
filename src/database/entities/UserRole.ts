import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
@Entity({ name: 'user_role' })
export default class UserRole {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @Column({ name: 'role_name', type: 'varchar', length: 10, nullable: false })
  roleName: string;
}
