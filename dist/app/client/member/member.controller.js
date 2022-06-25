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
exports.MemberController = void 0;
const common_1 = require("@nestjs/common");
const member_service_1 = require("./member.service");
const user_decorator_1 = require("../../../core/decorators/user.decorator");
let MemberController = class MemberController {
    constructor(memberService) {
        this.memberService = memberService;
    }
    getPersonalInfo(req) {
        const _a = req.user, { tokenType } = _a, user = __rest(_a, ["tokenType"]);
        return this.memberService.getPersonalInfo(user);
    }
    registerShop(body, member) {
        return this.memberService.registerShop(member.id, body);
    }
    editPhone(body, member) {
        return this.memberService.editPhone(member.id, body);
    }
};
__decorate([
    (0, common_1.Get)('get-personal-info'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MemberController.prototype, "getPersonalInfo", null);
__decorate([
    (0, common_1.Post)('register-shop'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserData)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MemberController.prototype, "registerShop", null);
__decorate([
    (0, common_1.Post)('edit-phone'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserData)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MemberController.prototype, "editPhone", null);
MemberController = __decorate([
    (0, common_1.Controller)('member'),
    __metadata("design:paramtypes", [member_service_1.MemberService])
], MemberController);
exports.MemberController = MemberController;
//# sourceMappingURL=member.controller.js.map