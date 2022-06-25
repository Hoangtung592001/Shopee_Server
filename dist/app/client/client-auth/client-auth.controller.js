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
exports.ClientAuthController = void 0;
const common_1 = require("@nestjs/common");
const client_auth_service_1 = require("./client-auth.service");
const public_decorator_1 = require("../../../core/decorators/public.decorator");
let ClientAuthController = class ClientAuthController {
    constructor(clientAuthService) {
        this.clientAuthService = clientAuthService;
    }
    signUp(body) {
        return this.clientAuthService.signUp(body);
    }
    signIn(body) {
        return this.clientAuthService.signIn(body);
    }
    async changePassword(req) {
        const body = req.body;
        const user = req.user;
        const { tokenType } = user, payload = __rest(user, ["tokenType"]);
        return await this.clientAuthService.changePassword(body, payload);
    }
    async refreshAccessToken(req) {
        const body = req.body;
        return this.clientAuthService.refreshAccessToken(body);
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ClientAuthController.prototype, "signUp", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ClientAuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('change-password'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientAuthController.prototype, "changePassword", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('refresh-access-token'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientAuthController.prototype, "refreshAccessToken", null);
ClientAuthController = __decorate([
    (0, common_1.Controller)('client-auth'),
    __metadata("design:paramtypes", [client_auth_service_1.ClientAuthService])
], ClientAuthController);
exports.ClientAuthController = ClientAuthController;
//# sourceMappingURL=client-auth.controller.js.map