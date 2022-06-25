import { ErrorCode } from '$types/enums';
import { HttpException, HttpStatus } from '@nestjs/common';
export declare class CustomExceptionFactory extends HttpException {
    constructor(errorCode: ErrorCode, devMessage?: string | any, statusCode?: HttpStatus, payload?: any);
}
export declare class Exception extends CustomExceptionFactory {
    constructor(errorCode: ErrorCode, devMessage?: string | any, statusCode?: HttpStatus, payload?: any);
}
export declare class Forbidden extends CustomExceptionFactory {
    constructor(devMessage?: string | any, payload?: any);
}
export declare class Unauthorized extends CustomExceptionFactory {
    constructor(devMessage?: string | any, payload?: any);
}
export declare class UnprocessableEntity extends CustomExceptionFactory {
    constructor(devMessage?: string | any, payload?: any);
}
