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
exports.AdminAuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const User_1 = require("../../../database/entities/User");
const typeorm_2 = require("@nestjs/typeorm");
const auth_service_1 = require("../../shared/auth/auth.service");
const bcrypt_1 = require("bcrypt");
const exception_1 = require("../../../helpers/exception");
const enums_1 = require("../../../types/enums");
const _config_1 = require("../../../config");
let AdminAuthService = class AdminAuthService {
    constructor(connection, authService, userRepository) {
        this.connection = connection;
        this.authService = authService;
        this.userRepository = userRepository;
    }
    async signUp(user) {
        return await this.connection.transaction(async (transaction) => {
            const userRepository = transaction.getRepository(User_1.default);
            const isEmailExists = await this.isEmailExists(user.email, userRepository);
            if (isEmailExists)
                throw new exception_1.Exception(enums_1.ErrorCode.Email_Already_Exist, 'Email alredy exist. Chose an other one!');
            user.password = await (0, bcrypt_1.hash)(user.password, _config_1.default.BCRYPT_HASH_ROUNDS);
            const userSave = await userRepository.save(user);
            return userSave;
        });
    }
    async signIn(user) {
        const hasEmail = await this.userRepository
            .createQueryBuilder('q')
            .innerJoinAndSelect('q.role', 'role')
            .where({ email: user.email })
            .getOne();
        if (!hasEmail)
            throw new exception_1.Exception(enums_1.ErrorCode.Not_Found, "Email didn't exist. Please sign in first!");
        const isMatched = await (0, bcrypt_1.compare)(user.password, hasEmail.password);
        if (!isMatched)
            throw new exception_1.Exception(enums_1.ErrorCode.Email_Or_Password_Not_valid, 'Password is incorrect. Please try again!');
        const refreshTokenExpired = await this.authService.verifyRefreshToken(hasEmail.refreshToken, this.userRepository);
        let { email, id } = hasEmail, account = __rest(hasEmail, ["email", "id"]);
        const payload = {
            id: id,
            role: hasEmail.role.roleName,
        };
        const accessToken = this.authService.generateAccessToken(payload);
        if (refreshTokenExpired) {
            const tokens = {
                accessToken: accessToken,
                refreshToken: hasEmail.refreshToken,
            };
            return tokens;
        }
        const refreshToken = this.authService.generateRefreshToken(payload);
        await this.userRepository.update({ email: email }, { refreshToken: refreshToken });
        const tokens = {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
        return tokens;
    }
    async isEmailExists(email, userRepository) {
        userRepository = userRepository || this.userRepository;
        const isExist = await userRepository.findOne({
            where: { email },
            select: ['id'],
        });
        return !!isExist;
    }
    async changePassword(info, user) {
        const userInDb = await this.userRepository.findOne({
            where: { id: user.id }
        });
        const isMatchedPassword = await (0, bcrypt_1.compare)(info.oldPassword, userInDb.password);
        if (!isMatchedPassword)
            throw new exception_1.Exception(enums_1.ErrorCode.Old_Password_Incorrect, 'Old password you typed is wrong! Please try again!');
        const newPassword = await (0, bcrypt_1.hash)(info.newPassword, _config_1.default.BCRYPT_HASH_ROUNDS);
        await this.userRepository.update({ email: userInDb.email }, { password: newPassword });
        return user;
    }
    async refreshAccessToken(params) {
        const userInfo = await this.authService.verifyRefreshToken(params.refreshToken, this.userRepository);
        if (!userInfo)
            throw new exception_1.Exception(enums_1.ErrorCode.Token_Not_Exist, 'Your Token is invalid!');
        const accessToken = this.authService.generateAccessToken(userInfo);
        return accessToken;
    }
    async getAllUsers() {
        return this.userRepository.find({ select: ['email', 'username', 'roleId', 'createdAt', 'dateOfBirth'] });
    }
};
AdminAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_2.InjectRepository)(User_1.default)),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        auth_service_1.AuthService,
        typeorm_1.Repository])
], AdminAuthService);
exports.AdminAuthService = AdminAuthService;
//# sourceMappingURL=admin-auth.service.js.map