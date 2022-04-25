import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import RoleUser from '$database/entities/UserRole';
import Notification from "./Notification";
@Entity({ name: 'users' })
export default class User {
    @PrimaryGeneratedColumn({ name: "id", type: "bigint", unsigned: true })
    id: number

    @Column({ name: "email", type: "varchar", length: 255, nullable: false })
    email: string

    @Column({ name: "password", type: "varchar", length: 255, nullable: false })
    password: string

    @Column({ name: "username", type: "varchar", length: 255, nullable: false })
    username: string

    @Column({ name: "status", type: "boolean" })
    status: boolean;

    @Column({ name: "date_of_birth", type: "date", nullable: true })
    dateOfBirth: string
    
    @Column({ name: "refresh_token", type: "varchar", length: 1000, default: null })
    refreshToken: string

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: string | Date

    @Column({ name: "role_id", type: "bigint", unsigned: true, default: 1 })
    roleId: number

    @ManyToOne(() => RoleUser)
    @JoinColumn({ name: 'role_id', referencedColumnName: 'id'})
    role: RoleUser;

    @OneToMany(
        () => Notification,
        (Notification) => Notification.receiver,
      )
      Notifications: Notification[];
}