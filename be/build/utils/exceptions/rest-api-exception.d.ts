import { HttpStatusCode } from 'axios';
import { BaseException } from '.';
export declare class RestApiException extends BaseException {
    httpCode: number;
    constructor(message: string, httpCode?: HttpStatusCode);
}
