import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'order_details' })
export default class OrderDetail {
    @PrimaryGeneratedColumn({ name: "id", type: "bigint", unsigned: true})
    id: number;
    @Column({ name: "order_id", type: "bigint", unsigned: true})
    orderId: number;
    @Column({ name: "product_code", type: "varchar", length: 255, nullable: false})
    productCode: string;
    @Column({ name: "quantity_order", type: "int", unsigned: true, nullable: false})
    quantityOrder: number;
    @Column({ name: "customer_id", type: "bigint", unsigned: true, nullable: false})
    customerId: number;
}