"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.formatErrorObject = exports.AllExceptionsFilter = void 0;
const enums_1 = require("../../types/enums");
const common_1 = require("@nestjs/common");
const log4js_1 = require("log4js");
const logger = (0, log4js_1.getLogger)('Exception');
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const request = context.getRequest();
        Object.assign(exception, {
            request: {
                method: request.method,
                url: request.url,
                body: request.body,
                ip: request.ip
            },
        });
        logger.error(exception);
        const _a = formatErrorObject(exception), { statusCode } = _a, errorObject = __rest(_a, ["statusCode"]);
        response.status(statusCode).json(errorObject);
    }
};
AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
function formatErrorObject(exception) {
    const errorObj = {
        success: false,
        statusCode: common_1.HttpStatus.BAD_REQUEST,
        errorCode: enums_1.ErrorCode.Unknown_Error,
        message: null,
    };
    if (exception instanceof common_1.HttpException) {
        const data = exception.getResponse();
        if (data === null || data === void 0 ? void 0 : data.errorCode)
            errorObj.errorCode = data === null || data === void 0 ? void 0 : data.errorCode;
        if (data === null || data === void 0 ? void 0 : data.statusCode)
            errorObj.statusCode = data === null || data === void 0 ? void 0 : data.statusCode;
        if (data === null || data === void 0 ? void 0 : data.message)
            errorObj.message = data.message;
        if (data === null || data === void 0 ? void 0 : data.error)
            errorObj['error'] = data['error'];
        if (data === null || data === void 0 ? void 0 : data.payload)
            errorObj['payload'] = data['payload'];
    }
    if (!(errorObj === null || errorObj === void 0 ? void 0 : errorObj.message))
        errorObj['message'] = errorObj.errorCode;
    return errorObj;
}
exports.formatErrorObject = formatErrorObject;
//# sourceMappingURL=http-exception.filter.js.map