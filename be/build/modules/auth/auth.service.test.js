"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const users_1 = require("../users");
const auth_service_1 = require("./auth.service");
const mockData_1 = require("../../test/mockData");
const mockUsersDaoAuthenticate = jest.fn();
const mockUsersDaoGet = jest.fn();
const mockUsersDaoGetByUsername = jest.fn();
const mockUsersDaoGetByEmail = jest.fn();
const mockUsersDaoCreate = jest.fn();
jest.mock('../users/users.dao', () => ({
    UsersDao: jest.fn().mockImplementation(() => ({
        authenticate: (payload) => mockUsersDaoAuthenticate(payload),
        get: (payload) => mockUsersDaoGet(payload),
        getByUsername: (payload) => mockUsersDaoGetByUsername(payload),
        getByEmail: (payload) => mockUsersDaoGetByEmail(payload),
        create: (payload) => mockUsersDaoCreate(payload)
    }))
}));
jest.mock('mongoose', () => ({
    ...jest.requireActual('mongoose'),
    model: jest.fn().mockImplementation(() => ({}))
}));
const mockJwtSign = jest.fn();
const mockJwtVerify = jest.fn();
jest.mock('jsonwebtoken', () => ({
    ...jest.requireActual('jsonwebtoken'),
    sign: jest.fn().mockImplementation(() => mockJwtSign()),
    verify: jest.fn().mockImplementation(() => mockJwtVerify())
}));
describe('auth-service', () => {
    const mockAccessToken = 'generated-access-token';
    const mockRefreshToken = 'generated-refresh-token';
    const mockUserToken = {
        user: mockData_1.mockUser,
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
        expiresIn: 3600
    };
    mockUsersDaoAuthenticate.mockReturnValue(Promise.resolve(mockData_1.mockUser));
    mockUsersDaoGet.mockReturnValue(Promise.resolve(mockData_1.mockUser));
    mockUsersDaoGetByUsername.mockReturnValue(Promise.resolve(null));
    mockUsersDaoGetByEmail.mockReturnValue(Promise.resolve(null));
    mockUsersDaoCreate.mockReturnValue(Promise.resolve(mockData_1.mockUser));
    mockUsersDaoCreate.mockReturnValue(Promise.resolve(mockData_1.mockUser));
    const usersService = new users_1.UsersService({ usersDao: new users_1.UsersDao() });
    const authService = new auth_service_1.AuthService({ usersService });
    beforeEach(() => {
        mockJwtSign.mockReturnValueOnce(mockAccessToken);
        mockJwtSign.mockReturnValueOnce(mockRefreshToken);
        mockJwtVerify.mockReturnValue(mockUserToken);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('getUser', () => {
        it('should successfully return user', async () => {
            const user = await authService.getUserById(mockData_1.mockUser.id);
            expect(mockUsersDaoGet).toHaveBeenCalled();
            expect(user).toEqual(user);
        });
        it('should throw an error when role not found', async () => {
            mockUsersDaoGet.mockRejectedValueOnce(new utils_1.RestApiException('not found'));
            await expect(authService.getUserById(mockData_1.mockUser.id)).rejects.toThrow(utils_1.RestApiException);
        });
    });
    describe('authenticate', () => {
        it('should successfully authenticate user', async () => {
            const user = await authService.authenticate({
                username: 'username',
                password: 'password'
            });
            expect(mockUsersDaoAuthenticate).toHaveBeenCalled();
            expect(user).toEqual(mockData_1.mockUser);
        });
        it('should throw an error when usersDao.authenticate throw an error', async () => {
            mockUsersDaoAuthenticate.mockRejectedValueOnce(new utils_1.RestApiException('not found'));
            await expect(authService.authenticate({
                username: 'username',
                password: 'password'
            })).rejects.toThrow(utils_1.RestApiException);
        });
    });
    describe('login', () => {
        it('should successfully authenticate user', async () => {
            const token = await authService.login({
                username: 'username',
                password: 'password'
            });
            expect(mockUsersDaoAuthenticate).toHaveBeenCalled();
            expect(token).toEqual(mockUserToken);
        });
        it('should throw an error when usersDao.authenticate throw an error', async () => {
            mockUsersDaoAuthenticate.mockRejectedValueOnce(new utils_1.RestApiException('not found'));
            await expect(authService.login({
                username: 'username',
                password: 'password'
            })).rejects.toThrow(utils_1.RestApiException);
        });
    });
    describe('verify', () => {
        it('should successfully verify authenticated user', async () => {
            const token = await authService.verify(mockData_1.mockUser);
            expect(mockJwtSign).toHaveBeenCalledTimes(2);
            expect(token).toEqual(mockUserToken);
        });
    });
    describe('register', () => {
        it('should successfully register user', async () => {
            const token = await authService.register(mockData_1.mockRegisterUserPayload);
            expect(mockUsersDaoCreate).toHaveBeenCalled();
            expect(token).toEqual(mockUserToken);
        });
        it('should throw an error when password and confirmPassword is not match', async () => {
            await expect(authService.register({
                ...mockData_1.mockRegisterUserPayload,
                password: 'password',
                confirmPassword: 'not-match-password'
            })).rejects.toThrow(utils_1.RestApiException);
        });
    });
    describe('refresh', () => {
        it('should successfully verify authenticated user', async () => {
            const token = await authService.refresh('refresh-token');
            expect(mockJwtVerify).toHaveBeenCalled();
            expect(mockJwtSign).toHaveBeenCalledTimes(2);
            expect(token).toEqual(mockUserToken);
        });
        it('should throw an error when data access object throw an error', async () => {
            mockJwtVerify.mockReturnValueOnce(null);
            await expect(authService.refresh('refresh-token')).rejects.toThrowError();
            expect(mockJwtSign).not.toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=auth.service.test.js.map