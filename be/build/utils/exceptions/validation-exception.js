"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
const _1 = require(".");
class ValidationException extends _1.BaseException {
    constructor(message) {
        super(_1.EExceptionCodes.Validation, message);
    }
}
exports.ValidationException = ValidationException;
//# sourceMappingURL=validation-exception.js.map