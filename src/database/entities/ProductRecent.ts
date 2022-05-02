import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import Product from "./Product";
import User from "./User";

@Entity({ name: 'product_recent' })
export default class ProductRecent {
    @PrimaryGeneratedColumn({ name: "id", type: "bigint", unsigned: true })
    id: number;

    @Column({ name: "visitor_id", type: "bigint", unsigned: true })
    visitorId: number;

    @Column({ name: "product_code", type: "bigint", unsigned: true })
    productCode: number;

    @CreateDateColumn({ name: 'visited_at', type: 'datetime' })
    visitedAt: string;

    @ManyToOne(() => User) 
    @JoinColumn({ name: 'visitor_id', referencedColumnName: 'id' })
    visitor: User;

    @ManyToOne(() => Product) 
    @JoinColumn({ name: 'product_code', referencedColumnName: 'id' })
    product: Product;
}