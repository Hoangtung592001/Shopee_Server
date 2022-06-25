import Product from './Product';
import User from './User';
export default class Judge {
    id: number;
    memberId: number;
    productCode: number;
    content: string;
    stars: number;
    status: number;
    createdAt: string | Date;
    updatedAt: string | Date;
    product: Product;
    user: User;
}
