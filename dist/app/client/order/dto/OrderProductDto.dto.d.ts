import { TransferringMethodStatus } from '$types/enums';
export interface OrderProductDto {
    voucherId?: number;
    address: string;
    transferringMethodId?: TransferringMethodStatus;
    receiverName: string;
    phone: string;
    data: {
        [key: string]: {
            productCode: number;
            quantity: number;
            priceEach?: number;
        }[];
    };
}
