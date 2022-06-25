import { ErrorCode } from '$types/enums';
import { ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
export declare class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
export declare function formatErrorObject(exception: HttpException | any): {
    success: boolean;
    statusCode: HttpStatus;
    errorCode: ErrorCode;
    message: any;
};
