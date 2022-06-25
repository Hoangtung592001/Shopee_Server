import Judge from './Judge';
import Like from './Like';
import UserShop from './UserShop';
export default class Product {
    id: number;
    productName: string;
    productLine: number;
    quantityInStock: number;
    priceEach: number;
    image: string;
    description: string;
    origin: string;
    discount: number;
    status: number;
    soldQuantity: number;
    sellerId: number;
    shopTypeId: number;
    likes: Like[];
    judges: Judge[];
    seller: UserShop;
}
