import Order from './Order';
export default class Like {
    id: number;
    memberId: number;
    value: number;
    status: number;
    usedAt: string | Date;
    startedAt: string | Date;
    expiredAt: string | Date;
    createdAt: string | Date;
    order: Order[];
}
