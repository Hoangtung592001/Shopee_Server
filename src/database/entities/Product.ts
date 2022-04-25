import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'products' })
export default class Product {
    @PrimaryGeneratedColumn("increment")
    id: number;
    @Column({ name: "product_name", type: "varchar", length: 255, nullable: false})
    productName: string;
    @Column({ name: "product_line", type: "int" })
    productLine: number;
    @Column({ name: "quantity_in_stock", type: "bigint", unsigned: true, nullable: false})
    quantityInStock: number;
    @Column({ name: "price_each", type: "double", unsigned: true, nullable: false})
    priceEach: number;
    @Column({ name: "image", type: "varchar", length: 10000, nullable: false})
    image: string;
    @Column({ name: "origin", type: "varchar", length: 255, nullable: false})
    origin: string;
    @Column({ name: "discount", type: "double"})
    discount: number;
    @Column({ name: "sold_quantity", type: "bigint", unsigned: true, nullable: false})
    soldQuantity: number;
    @Column({ name: "seller_id", type: "int", unsigned: true, nullable: false})
    sellerId: number;
    @Column({ name: "shop_type_id", type: "int", unsigned: true, default: 1})
    shopTypeId: number;
}