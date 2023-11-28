"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const jest_mock_req_res_1 = require("jest-mock-req-res");
const validate_dto_1 = require("./validate-dto");
const modules_1 = require("../modules");
const schemas_1 = require("../schemas");
describe('validate-dto', () => {
    const res = (0, jest_mock_req_res_1.mockResponse)({});
    const mockNext = { next: () => true };
    const spyNext = jest.spyOn(mockNext, 'next');
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('validate-body', () => {
        it('should successfully validate body', () => {
            const req = (0, jest_mock_req_res_1.mockRequest)({
                body: {
                    username: 'username',
                    password: 'password'
                }
            });
            const event = (0, validate_dto_1.validateBody)(modules_1.LoginPayloadSchema);
            expect(typeof event).toBe('function');
            event(req, res, mockNext.next);
            expect(spyNext).toHaveBeenCalled();
        });
        it('should send error response with bad request code', () => {
            const req = (0, jest_mock_req_res_1.mockRequest)({
                body: {
                    username: null,
                    password: 'password'
                }
            });
            const event = (0, validate_dto_1.validateBody)(modules_1.LoginPayloadSchema);
            expect(typeof event).toBe('function');
            event(req, res, mockNext.next);
            expect(spyNext).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalled();
            expect(res.status.mock.calls[0][0]).toEqual(axios_1.HttpStatusCode.BadRequest);
            expect(res.send).toHaveBeenCalled();
        });
    });
    describe('validate-params', () => {
        it('should successfully validate params', () => {
            const req = (0, jest_mock_req_res_1.mockRequest)({
                params: {
                    id: 'object-id'
                }
            });
            const event = (0, validate_dto_1.validateParams)(schemas_1.idSchema);
            expect(typeof event).toBe('function');
            event(req, res, mockNext.next);
            expect(spyNext).toHaveBeenCalled();
        });
        it('should send error response with bad request code when validating request params', () => {
            const req = (0, jest_mock_req_res_1.mockRequest)({ params: {} });
            const event = (0, validate_dto_1.validateParams)(schemas_1.idSchema);
            expect(typeof event).toBe('function');
            event(req, res, mockNext.next);
            expect(spyNext).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalled();
            expect(res.status.mock.calls[0][0]).toEqual(axios_1.HttpStatusCode.BadRequest);
            expect(res.send).toHaveBeenCalled();
        });
    });
    describe('validate-query', () => {
        it('should successfully validate query', () => {
            const req = (0, jest_mock_req_res_1.mockRequest)({
                query: {
                    id: 'object-id'
                }
            });
            const event = (0, validate_dto_1.validateQuery)(schemas_1.idSchema);
            expect(typeof event).toBe('function');
            event(req, res, mockNext.next);
            expect(spyNext).toHaveBeenCalled();
        });
        it('should send error response with bad request code when validating request queries', () => {
            const req = (0, jest_mock_req_res_1.mockRequest)({ query: {} });
            const event = (0, validate_dto_1.validateQuery)(schemas_1.idSchema);
            expect(typeof event).toBe('function');
            event(req, res, mockNext.next);
            expect(spyNext).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalled();
            expect(res.status.mock.calls[0][0]).toEqual(axios_1.HttpStatusCode.BadRequest);
            expect(res.send).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=validate-dto.test.js.map