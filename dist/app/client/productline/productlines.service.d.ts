import { IProductLineList } from '$types/interfaces';
import { Connection, Repository } from 'typeorm';
import ProductLine from '$database/entities/ProductLine';
import { AuthService } from '$shared/auth/auth.service';
export declare class ProductLineService {
    private readonly connection;
    private readonly authService;
    private readonly productLineRepository;
    constructor(connection: Connection, authService: AuthService, productLineRepository: Repository<ProductLine>);
    getAllProductLines(): Promise<IProductLineList>;
}
