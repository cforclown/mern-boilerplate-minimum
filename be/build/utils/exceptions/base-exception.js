"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseException = exports.EExceptionCodes = void 0;
const logger_1 = require("../logger");
var EExceptionCodes;
(function (EExceptionCodes) {
    EExceptionCodes["Validation"] = "Validation";
    EExceptionCodes["RestAPI"] = "RestAPI";
})(EExceptionCodes = exports.EExceptionCodes || (exports.EExceptionCodes = {}));
class BaseException extends Error {
    constructor(exceptionCode, message) {
        super(message);
        this.exceptionCode = exceptionCode;
        logger_1.Logger.error(`[${this.exceptionCode}] ${this.message ? this.message : 'UNKNOWN ERROR'}`, logger_1.ELogLevel.ERROR);
    }
}
exports.BaseException = BaseException;
//# sourceMappingURL=base-exception.js.map