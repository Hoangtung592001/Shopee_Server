import Product from "./Product";
import User from "./User";
export default class ProductRecent {
    id: number;
    visitorId: number;
    productCode: number;
    visitedAt: string;
    visitor: User;
    product: Product;
}
