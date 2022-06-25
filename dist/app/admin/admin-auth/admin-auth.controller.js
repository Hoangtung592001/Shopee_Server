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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthController = void 0;
const common_1 = require("@nestjs/common");
const admin_auth_service_1 = require("./admin-auth.service");
const public_decorator_1 = require("../../../core/decorators/public.decorator");
const roles_decorator_1 = require("../../../core/decorators/roles.decorator");
const enums_1 = require("../../../types/enums");
let AdminAuthController = class AdminAuthController {
    constructor(adminAuthService) {
        this.adminAuthService = adminAuthService;
    }
    signUp(body) {
        return this.adminAuthService.signUp(body);
    }
    signIn(body) {
        return this.adminAuthService.signIn(body);
    }
    async changePassword(req) {
        const body = req.body;
        const user = req.user;
        const { tokenType } = user, payload = __rest(user, ["tokenType"]);
        return await this.adminAuthService.changePassword(body, payload);
    }
    async refreshAccessToken(req) {
        const body = req.body;
        return this.adminAuthService.refreshAccessToken(body);
    }
    async adminGetAllUsers() {
        return this.adminAuthService.getAllUsers();
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminAuthController.prototype, "signUp", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminAuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('change-password'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "changePassword", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('refresh-access-token'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "refreshAccessToken", null);
__decorate([
    (0, common_1.Get)('admin-get-all-users'),
    (0, roles_decorator_1.Roles)(enums_1.Role.Admin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "adminGetAllUsers", null);
AdminAuthController = __decorate([
    (0, common_1.Controller)('admin-auth'),
    __metadata("design:paramtypes", [admin_auth_service_1.AdminAuthService])
], AdminAuthController);
exports.AdminAuthController = AdminAuthController;
//# sourceMappingURL=admin-auth.controller.js.map