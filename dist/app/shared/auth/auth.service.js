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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const enums_1 = require("../../../types/enums");
const _config_1 = require("../../../config");
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    generateAccessToken(input) {
        const payload = Object.assign({}, input);
        return this.jwtService.sign(Object.assign(Object.assign({}, payload), { tokenType: enums_1.TokenType.ACCESS_TOKEN }), {
            secret: _config_1.default.JWT_SECRET_KEY,
            expiresIn: _config_1.default.JWT_ACCESS_TOKEN_EXPIRES_IN,
        });
    }
    generateRefreshToken(input) {
        const payload = Object.assign({}, input);
        return this.jwtService.sign(Object.assign(Object.assign({}, payload), { tokenType: enums_1.TokenType.REFRESH_TOKEN }), {
            secret: _config_1.default.JWT_SECRET_KEY,
            expiresIn: _config_1.default.JWT_REFRESH_TOKEN_EXPIRES_IN,
        });
    }
    async verifyRefreshToken(refreshToken, userRepository) {
        if (!refreshToken) {
            return false;
        }
        const isValid = await this.unPackageRefreshOrAccessToken(refreshToken);
        if (!isValid)
            return false;
        const hasRefreshToken = await userRepository.findOne({
            where: { refreshToken: refreshToken },
        });
        if (!hasRefreshToken) {
            return false;
        }
        return isValid;
    }
    async unPackageRefreshOrAccessToken(token) {
        try {
            const payload = this.jwtService.verify(token, {
                secret: _config_1.default.JWT_SECRET_KEY,
            });
            return payload;
        }
        catch (err) {
            return false;
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map