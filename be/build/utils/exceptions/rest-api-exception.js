"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestApiException = void 0;
const _1 = require(".");
class RestApiException extends _1.BaseException {
    constructor(message, httpCode = 400) {
        super(_1.EExceptionCodes.RestAPI, message);
        this.httpCode = httpCode;
    }
}
exports.RestApiException = RestApiException;
//# sourceMappingURL=rest-api-exception.js.map