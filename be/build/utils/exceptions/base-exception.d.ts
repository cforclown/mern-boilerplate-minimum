export declare enum EExceptionCodes {
    Validation = "Validation",
    RestAPI = "RestAPI"
}
export declare abstract class BaseException extends Error {
    readonly exceptionCode: string;
    constructor(exceptionCode: EExceptionCodes, message?: string);
}
