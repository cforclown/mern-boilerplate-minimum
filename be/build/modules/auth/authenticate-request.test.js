"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_request_1 = require("./authenticate-request");
const axios_1 = require("axios");
const utils_1 = require("../../utils");
describe('authenticate-request', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should successfully authenticate a request with a valid access token', () => {
        // Arrange
        const excludePaths = [];
        const mockReq = {
            originalUrl: '/api/v1/users',
            method: 'GET',
            headers: {
                authorization: 'Bearer validAccessToken'
            }
        };
        const mockRes = {
            sendStatus: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const mockNext = jest.fn();
        // Act
        (0, authenticate_request_1.authenticateRequest)(excludePaths)(mockReq, mockRes, mockNext);
        // Assert
        expect(mockRes.sendStatus).not.toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.send).not.toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalled();
    });
    it('should skip authentication for excluded paths with GET method', () => {
        // Arrange
        const excludePaths = ['/api/v1/public'];
        const mockReq = {
            originalUrl: '/api/v1/public',
            method: 'GET',
            headers: {}
        };
        const mockRes = {};
        const mockNext = jest.fn();
        // Act
        (0, authenticate_request_1.authenticateRequest)(excludePaths)(mockReq, mockRes, mockNext);
        // Assert
        expect(mockNext).toHaveBeenCalled();
    });
    it('should return 401 Unauthorized if no authorization header is present', () => {
        // Arrange
        const excludePaths = [];
        const mockReq = {
            originalUrl: '/api/v1/users',
            method: 'GET',
            headers: {}
        };
        const mockRes = {
            sendStatus: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const mockNext = jest.fn();
        // Act
        (0, authenticate_request_1.authenticateRequest)(excludePaths)(mockReq, mockRes, mockNext);
        // Assert
        expect(mockRes.sendStatus).toHaveBeenCalledWith(axios_1.HttpStatusCode.Unauthorized);
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.send).not.toHaveBeenCalled();
        expect(mockNext).not.toHaveBeenCalled();
    });
    it('should return 401 Unauthorized if the access token is invalid', () => {
        // Arrange
        const excludePaths = [];
        const mockReq = {
            originalUrl: '/api/v1/users',
            method: 'GET',
            headers: {
                authorization: 'Bearer invalidAccessToken'
            }
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const mockNext = jest.fn();
        // Act
        (0, authenticate_request_1.authenticateRequest)(excludePaths)(mockReq, mockRes, mockNext);
        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(axios_1.HttpStatusCode.Unauthorized);
        expect(mockRes.send).toHaveBeenCalledWith(utils_1.dro.error('Invalid access token'));
        expect(mockNext).not.toHaveBeenCalled();
    });
    it('should set req.user if the access token is valid', () => {
        // Arrange
        const excludePaths = [];
        const mockReq = {
            originalUrl: '/api/v1/users',
            method: 'GET',
            headers: {
                authorization: 'Bearer validAccessToken'
            }
        };
        const mockRes = {};
        const mockNext = jest.fn();
        // Act
        (0, authenticate_request_1.authenticateRequest)(excludePaths)(mockReq, mockRes, mockNext);
        // Assert
        expect(mockReq.user).toBeDefined();
        expect(mockNext).toHaveBeenCalled();
    });
});
//# sourceMappingURL=authenticate-request.test.js.map