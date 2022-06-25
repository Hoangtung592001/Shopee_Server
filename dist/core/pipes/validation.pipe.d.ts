import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class CustomParseIntPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): number;
}
export declare class Validate implements PipeTransform {
    private schemaRef;
    constructor(schemaRef: AjvSchema);
    transform(value: any, metadata: ArgumentMetadata): any;
}
