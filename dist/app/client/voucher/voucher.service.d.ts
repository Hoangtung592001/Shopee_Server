import { Connection, Repository } from 'typeorm';
import { AuthService } from '$shared/auth/auth.service';
import Voucher from '$database/entities/Voucher';
export declare class VoucherService {
    private readonly connection;
    private readonly authService;
    private readonly voucherRepository;
    constructor(connection: Connection, authService: AuthService, voucherRepository: Repository<Voucher>);
    getAllVouchers(memberId: number): Promise<Voucher[]>;
}
