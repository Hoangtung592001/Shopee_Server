import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'product_line' })
export default class ProductLine {
    @PrimaryGeneratedColumn({ name: "id", type: "bigint", unsigned: true })
    id: number;
    @Column({ name: "product_line", type: "varchar", length: 255, nullable: false})
    productLine: string;
    @Column({ name: "text_description", type: "varchar", length: 1000, nullable: false})
    textDescription: string;
    @Column({ name: "image", type: "varchar", length: 10000, nullable: false})
    image: string;

}