"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const auth_service_1 = require("../../shared/auth/auth.service");
const Notification_1 = require("../../../database/entities/Notification");
const OrderDetail_1 = require("../../../database/entities/OrderDetail");
const Product_1 = require("../../../database/entities/Product");
const enums_1 = require("../../../types/enums");
const UserShop_1 = require("../../../database/entities/UserShop");
const exception_1 = require("../../../helpers/exception");
const Order_1 = require("../../../database/entities/Order");
const User_1 = require("../../../database/entities/User");
let NotificationService = class NotificationService {
    constructor(connection, authService, notificationRepository, orderRepository) {
        this.connection = connection;
        this.authService = authService;
        this.notificationRepository = notificationRepository;
        this.orderRepository = orderRepository;
    }
    async adminGetAllNotifications() {
        return this.notificationRepository.find();
    }
    async getNotifications(userId) {
        return this.notificationRepository
            .createQueryBuilder('n')
            .innerJoinAndMapOne('n.member', User_1.default, 'u', 'u.id = n.receiverId AND u.status = :uStatus', { uStatus: enums_1.CommonStatus.Active })
            .where('n.receiverId = :userId', { userId: userId })
            .orderBy('n.id', 'DESC')
            .getMany();
    }
    async sendNotification(memberId, body) {
        const isOwner = await this.orderRepository
            .createQueryBuilder('o')
            .innerJoinAndMapMany('o.orderDetails', OrderDetail_1.default, 'od', 'o.id = od.orderId')
            .innerJoinAndMapOne('od.product', Product_1.default, 'p', 'p.id = od.productCode AND p.status = :pStatus', { pStatus: enums_1.ProductStatus.Active })
            .innerJoinAndMapOne('p.shop', UserShop_1.default, 'us', 'us.id = p.sellerId AND us.status = :usStatus AND us.ownerId = :usOwnerId', {
            usStatus: enums_1.CommonStatus.Active,
            usOwnerId: memberId,
        })
            .where('o.id = :oOrderId', {
            oOrderId: body.orderId,
        })
            .getMany();
        if (isOwner.length == 0) {
            throw new exception_1.Exception(enums_1.ErrorCode.Permisstion_Denied, 'You are not owner of this orders');
        }
        return this.notificationRepository.insert({
            orderId: body.orderId,
            receiverId: body.receiverId,
            notificationTypeId: body.status,
        });
    }
};
NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_2.InjectRepository)(Notification_1.default)),
    __param(3, (0, typeorm_2.InjectRepository)(Order_1.default)),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        auth_service_1.AuthService,
        typeorm_1.Repository,
        typeorm_1.Repository])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map