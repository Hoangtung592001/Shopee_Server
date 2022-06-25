import Product from './Product';
export default class Like {
    id: number;
    memberId: number;
    productCode: number;
    status: number;
    createdAt: string | Date;
    updatedAt: string | Date;
    product: Product;
}
