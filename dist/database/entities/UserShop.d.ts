import Product from './Product';
import User from './User';
import UserShopType from './UserShopType';
export default class UserShop {
    id: number;
    shopName: string;
    address: string;
    coverPhoto: string;
    profilePicture: string;
    shopTypeId: number;
    ownerId: number;
    status: number;
    registeredAt: string;
    products: Product[];
    shopType: UserShopType;
    owner: User;
}
