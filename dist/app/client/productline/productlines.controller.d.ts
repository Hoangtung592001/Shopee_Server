import { ProductLineService } from './productlines.service';
export declare class ProductLineController {
    private readonly productLineService;
    constructor(productLineService: ProductLineService);
    getAllProductLines(): Promise<import("$types/interfaces").IProductLineList>;
}
