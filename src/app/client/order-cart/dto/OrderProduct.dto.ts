export interface OrderProductDto {
    comment?: string;
    address: string;
    products: ProductOrderDto[]
};

export interface ProductOrderDto {
    productCode: number;
    quantityOrder: number;
}
