"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const jest_mock_req_res_1 = require("jest-mock-req-res");
const request_handler_1 = require("./request-handler");
const exceptions_1 = require("./exceptions");
const logger_1 = require("./logger");
describe('request-handler', () => {
    const data = {
        message: 'message'
    };
    const event = jest.fn().mockImplementation(async () => data);
    const req = (0, jest_mock_req_res_1.mockRequest)({});
    const res = (0, jest_mock_req_res_1.mockResponse)({});
    const next = () => ({});
    const spyOnLoggerException = jest.spyOn(logger_1.Logger, 'exception');
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should send data successfully', async () => {
        const result = (0, request_handler_1.RequestHandler)(event);
        expect(typeof result).toBe('function');
        await result(req, res, next);
        expect(res.send).toHaveBeenCalled();
    });
    it('should should send error response with given http code', async () => {
        event.mockRejectedValueOnce(new exceptions_1.RestApiException('not found', axios_1.HttpStatusCode.NotFound));
        const result = (0, request_handler_1.RequestHandler)(event);
        expect(typeof result).toBe('function');
        await result(req, res, next);
        expect(res.status).toHaveBeenCalledWith(axios_1.HttpStatusCode.NotFound);
        expect(res.send).toHaveBeenCalledWith({
            data: null, error: 'not found'
        });
        expect(spyOnLoggerException).not.toHaveBeenCalled();
    });
    it('should should send error response with http code internal server error', async () => {
        event.mockRejectedValueOnce(new Error('error'));
        const result = (0, request_handler_1.RequestHandler)(event);
        expect(typeof result).toBe('function');
        await result(req, res, next);
        expect(res.status).toHaveBeenCalledWith(axios_1.HttpStatusCode.InternalServerError);
        expect(res.send).toHaveBeenCalledWith({
            data: null, error: 'error'
        });
        expect(spyOnLoggerException).toHaveBeenCalled();
    });
});
//# sourceMappingURL=request-handler.test.js.map