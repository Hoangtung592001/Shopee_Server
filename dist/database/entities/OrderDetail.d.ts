import Order from './Order';
export default class OrderDetail {
    id: number;
    orderId: number;
    productCode: number;
    quantityOrder: number;
    priceEach: number;
    order: Order;
}
