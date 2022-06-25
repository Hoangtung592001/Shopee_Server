import Product from './Product';
export default class OrderCart {
    orderId: number;
    productCode: number;
    quantityOrder: number;
    customerId: number;
    status: number;
    createdAt: string | Date;
    deletedAt: string | Date;
    product: Product;
}
