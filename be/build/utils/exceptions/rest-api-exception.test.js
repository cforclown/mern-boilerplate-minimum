"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const rest_api_exception_1 = require("./rest-api-exception");
const base_exception_1 = require("./base-exception");
describe('request-error', () => {
    const errorMessage = 'error message';
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should be an instance of RestApiException', () => {
        const error = new rest_api_exception_1.RestApiException(errorMessage);
        expect(error).toBeInstanceOf(rest_api_exception_1.RestApiException);
    });
    it('should inherit from BaseException', () => {
        const error = new rest_api_exception_1.RestApiException(errorMessage);
        expect(error).toBeInstanceOf(base_exception_1.BaseException);
    });
    it('should contain default httpCode (400/bad request)', () => {
        const error = new rest_api_exception_1.RestApiException(errorMessage);
        expect(error).toHaveProperty('httpCode');
        expect(error.httpCode).toEqual(axios_1.HttpStatusCode.BadRequest);
        expect(error.message).toEqual(errorMessage);
    });
    it('should contain specified error message and httpCode', () => {
        const error = new rest_api_exception_1.RestApiException(errorMessage, axios_1.HttpStatusCode.InternalServerError);
        expect(error).toHaveProperty('httpCode');
        expect(error.httpCode).toEqual(axios_1.HttpStatusCode.InternalServerError);
        expect(error.message).toEqual(errorMessage);
    });
});
//# sourceMappingURL=rest-api-exception.test.js.map