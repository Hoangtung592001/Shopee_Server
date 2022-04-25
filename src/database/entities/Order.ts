import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'order' })
export default class Order {
    @PrimaryGeneratedColumn({ name: "id", type: "bigint", unsigned: true})
    id: number;
    @CreateDateColumn({ name: 'ordered_at', type: 'datetime' })
    orderedAt: string | Date;
    @Column({ name: "shipped_date", type: "datetime"})
    productCode: string | Date;
    @Column({ name: "status", type: "varchar", length: 255, nullable: false})
    status: string;
    @Column({ name: "comment", type: "varchar", length: 1000, nullable: false})
    comment: string;
    @Column({ name: "address", type: "varchar", length: 1000, nullable: false})
    address: string;
    @Column({ name: "customer_id", type: "bigint", unsigned: true, nullable: false})
    customerId: number;
}