"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_exception_1 = require("./base-exception");
const validation_exception_1 = require("./validation-exception");
describe('validation-exception', () => {
    it('should throw ValidationException with the correct code and default message', () => {
        const exception = new validation_exception_1.ValidationException();
        expect(exception.message).toBeFalsy();
        expect(exception.exceptionCode).toEqual(base_exception_1.EExceptionCodes.Validation);
    });
    it('should throw ValidationException with the correct code and message', () => {
        const message = 'exception message';
        const exception = new validation_exception_1.ValidationException(message);
        expect(exception.message).toEqual(message);
        expect(exception.exceptionCode).toEqual(base_exception_1.EExceptionCodes.Validation);
    });
});
//# sourceMappingURL=validation-exception.test.js.map