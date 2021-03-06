"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    SERVER_PORT: Number(process.env.SERVER_PORT) || 3000,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    JWT_REFRESH_TOKEN_EXPIRES_IN: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    BCRYPT_HASH_ROUNDS: Number(process.env.BCRYPT_HASH_ROUNDS),
};
//# sourceMappingURL=config.js.map