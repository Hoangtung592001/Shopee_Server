"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const http_exception_filter_1 = require("../core/filters/http-exception.filter");
const roles_guard_1 = require("../core/guards/roles.guard");
const transform_res_interceptor_1 = require("../core/interceptors/transform-res.interceptor");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("./shared/auth/jwt-auth.guard");
const logger_middleware_1 = require("../core/middleware/logger.middleware");
const admin_module_1 = require("./admin/admin.module");
const config_1 = require("@nestjs/config");
const client_module_1 = require("./client/client.module");
const typeorm_1 = require("@nestjs/typeorm");
const Notification_1 = require("../database/entities/Notification");
const NotificationType_1 = require("../database/entities/NotificationType");
const Order_1 = require("../database/entities/Order");
const OrderCart_1 = require("../database/entities/OrderCart");
const OrderDetail_1 = require("../database/entities/OrderDetail");
const Product_1 = require("../database/entities/Product");
const ProductLine_1 = require("../database/entities/ProductLine");
const TransferringMethod_1 = require("../database/entities/TransferringMethod");
const User_1 = require("../database/entities/User");
const UserRole_1 = require("../database/entities/UserRole");
const Judge_1 = require("../database/entities/Judge");
const Like_1 = require("../database/entities/Like");
const Voucher_1 = require("../database/entities/Voucher");
const UserShopType_1 = require("../database/entities/UserShopType");
const UserShop_1 = require("../database/entities/UserShop");
const ProductRecent_1 = require("../database/entities/ProductRecent");
const Image_1 = require("../database/entities/Image");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.MYSQL_HOST,
                port: +process.env.MYSQL_PORT,
                username: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASS,
                database: process.env.MYSQL_DBNAME,
                supportBigNumbers: false,
                synchronize: true,
                logging: true,
                charset: 'utf8mb4',
                entities: [
                    Notification_1.default,
                    NotificationType_1.default,
                    Order_1.default,
                    OrderCart_1.default,
                    OrderDetail_1.default,
                    Product_1.default,
                    ProductLine_1.default,
                    ProductRecent_1.default,
                    UserShopType_1.default,
                    UserShop_1.default,
                    TransferringMethod_1.default,
                    User_1.default,
                    UserRole_1.default,
                    Judge_1.default,
                    Like_1.default,
                    Voucher_1.default,
                    Image_1.default,
                ],
            }),
            admin_module_1.AdminModule,
            client_module_1.ClientModule,
        ],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.AllExceptionsFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: transform_res_interceptor_1.TransformResponseInterceptor,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map