export interface OrderProductDto {
    comment?: string;
    address: string;
    products: ProductOrderDto[];
}
export interface ProductOrderDto {
    productCode: string;
    quantityOrder: number;
}
