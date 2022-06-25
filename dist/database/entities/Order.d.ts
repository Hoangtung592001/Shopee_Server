import OrderDetail from './OrderDetail';
import Voucher from './Voucher';
export default class Order {
    id: number;
    orderedAt: string | Date;
    deletedAt: string | Date;
    deliveredAt: string | Date;
    shippedAt: string | Date;
    status: number;
    address: string;
    receiverName: string;
    phone: string;
    customerId: number;
    voucherId: number;
    shippingFee: number;
    voucher: Voucher;
    orderdetails: OrderDetail[];
}
