import { VoucherService } from './voucher.service';
export declare class VoucherController {
    private readonly voucherService;
    constructor(voucherService: VoucherService);
    getAllVouchers(member: Express.User): Promise<import("../../../database/entities/Voucher").default[]>;
}
