import { authenticateRequest } from './authenticate-request';
import { HttpStatusCode } from 'axios';
import { dro } from '../../utils';

describe('authenticate-request', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully authenticate a request with a valid access token', () => {
    // Arrange
    const excludePaths: string[] = [];
    const mockReq: any = {
      originalUrl: '/api/v1/users',
      method: 'GET',
      headers: {
        authorization: 'Bearer validAccessToken'
      }
    };
    const mockRes: any = {
      sendStatus: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const mockNext = jest.fn();

    // Act
    authenticateRequest(excludePaths)(mockReq, mockRes, mockNext);

    // Assert
    expect(mockRes.sendStatus).not.toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.send).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });

  it('should skip authentication for excluded paths with GET method', () => {
    // Arrange
    const excludePaths: string[] = ['/api/v1/public'];
    const mockReq: any = {
      originalUrl: '/api/v1/public',
      method: 'GET',
      headers: {}
    };
    const mockRes: any = {};
    const mockNext = jest.fn();

    // Act
    authenticateRequest(excludePaths)(mockReq, mockRes, mockNext);

    // Assert
    expect(mockNext).toHaveBeenCalled();
  });

  it('should return 401 Unauthorized if no authorization header is present', () => {
    // Arrange
    const excludePaths: string[] = [];
    const mockReq: any = {
      originalUrl: '/api/v1/users',
      method: 'GET',
      headers: {}
    };
    const mockRes: any = {
      sendStatus: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const mockNext = jest.fn();

    // Act
    authenticateRequest(excludePaths)(mockReq, mockRes, mockNext);

    // Assert
    expect(mockRes.sendStatus).toHaveBeenCalledWith(HttpStatusCode.Unauthorized);
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.send).not.toHaveBeenCalled();
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 401 Unauthorized if the access token is invalid', () => {
    // Arrange
    const excludePaths: string[] = [];
    const mockReq: any = {
      originalUrl: '/api/v1/users',
      method: 'GET',
      headers: {
        authorization: 'Bearer invalidAccessToken'
      }
    };
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const mockNext = jest.fn();

    // Act
    authenticateRequest(excludePaths)(mockReq, mockRes, mockNext);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(HttpStatusCode.Unauthorized);
    expect(mockRes.send).toHaveBeenCalledWith(dro.error('Invalid access token'));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should set req.user if the access token is valid', () => {
    // Arrange
    const excludePaths: string[] = [];
    const mockReq: any = {
      originalUrl: '/api/v1/users',
      method: 'GET',
      headers: {
        authorization: 'Bearer validAccessToken'
      }
    };
    const mockRes: any = {};
    const mockNext = jest.fn();

    // Act
    authenticateRequest(excludePaths)(mockReq, mockRes, mockNext);

    // Assert
    expect(mockReq.user).toBeDefined();
    expect(mockNext).toHaveBeenCalled();
  });
});
