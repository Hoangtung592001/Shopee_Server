"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableEntity = exports.Unauthorized = exports.Forbidden = exports.Exception = exports.CustomExceptionFactory = void 0;
const enums_1 = require("../types/enums");
const common_1 = require("@nestjs/common");
class CustomExceptionFactory extends common_1.HttpException {
    constructor(errorCode, devMessage, statusCode, payload) {
        const errorObject = { errorCode, statusCode: statusCode || common_1.HttpStatus.BAD_REQUEST };
        if (devMessage)
            errorObject['devMessage'] = devMessage;
        if (payload)
            errorObject['payload'] = payload;
        super(errorObject, errorObject.statusCode);
    }
}
exports.CustomExceptionFactory = CustomExceptionFactory;
class Exception extends CustomExceptionFactory {
    constructor(errorCode, devMessage, statusCode, payload) {
        super(errorCode, devMessage, statusCode, payload);
    }
}
exports.Exception = Exception;
class Forbidden extends CustomExceptionFactory {
    constructor(devMessage, payload) {
        super(enums_1.ErrorCode.Forbidden_Resource, devMessage, common_1.HttpStatus.FORBIDDEN, payload);
    }
}
exports.Forbidden = Forbidden;
class Unauthorized extends CustomExceptionFactory {
    constructor(devMessage, payload) {
        super(enums_1.ErrorCode.Unauthorized, devMessage, common_1.HttpStatus.UNAUTHORIZED, payload);
    }
}
exports.Unauthorized = Unauthorized;
class UnprocessableEntity extends CustomExceptionFactory {
    constructor(devMessage, payload) {
        super(enums_1.ErrorCode.Invalid_Input, devMessage, common_1.HttpStatus.UNPROCESSABLE_ENTITY, payload);
    }
}
exports.UnprocessableEntity = UnprocessableEntity;
//# sourceMappingURL=exception.js.map