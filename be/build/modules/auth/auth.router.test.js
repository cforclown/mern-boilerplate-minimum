"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const di_config_1 = require("../../di-config");
const app_1 = __importDefault(require("../../app"));
const mockData_1 = require("../../test/mockData");
const axios_1 = require("axios");
const mockJWTSign = jest.fn();
const mockJWTVerify = jest.fn();
jest.mock('jsonwebtoken', () => ({
    ...jest.requireActual('jsonwebtoken'),
    sign: jest.fn().mockImplementation((user, secret, options) => mockJWTSign(user, secret, options)),
    verify: jest.fn().mockImplementation((token, secret) => mockJWTVerify(token, secret))
}));
const mockModel = jest.fn();
jest.mock('mongoose', () => ({
    ...jest.requireActual('mongoose'),
    model: jest.fn().mockImplementation((collection) => mockModel(collection))
}));
const mockUsersDaoAuthenticate = jest.fn();
const mockUsersDaoGet = jest.fn();
const mockUsersDaoGetByUsername = jest.fn();
const mockUsersDaoGetByEmail = jest.fn();
const mockUsersDaoGetAll = jest.fn();
const mockUsersDaoGetCreate = jest.fn();
const mockUsersDaoGetUpdate = jest.fn();
const mockUsersDaoGetDelete = jest.fn();
jest.mock('../users/users.dao', () => ({
    UsersDao: jest.fn().mockImplementation(() => ({
        authenticate: (payload) => mockUsersDaoAuthenticate(payload),
        get: (payload) => mockUsersDaoGet(payload),
        getByUsername: (payload) => mockUsersDaoGetByUsername(payload),
        getByEmail: (payload) => mockUsersDaoGetByEmail(payload),
        getAll: (payload) => mockUsersDaoGetAll(payload),
        create: (payload) => mockUsersDaoGetCreate(payload),
        update: (payload) => mockUsersDaoGetUpdate(payload),
        delete: (payload) => mockUsersDaoGetDelete(payload)
    }))
}));
describe('auth-router', () => {
    mockUsersDaoAuthenticate.mockReturnValue(Promise.resolve(mockData_1.mockUser));
    mockUsersDaoGet.mockReturnValue(Promise.resolve(mockData_1.mockUser));
    mockUsersDaoGetByUsername.mockReturnValue(Promise.resolve(null));
    mockUsersDaoGetByEmail.mockReturnValue(Promise.resolve(null));
    mockUsersDaoGetAll.mockReturnValue(Promise.resolve([mockData_1.mockUser]));
    mockUsersDaoGetCreate.mockReturnValue(Promise.resolve(mockData_1.mockUser));
    mockUsersDaoGetUpdate.mockReturnValue(Promise.resolve(mockData_1.mockUser));
    mockUsersDaoGetDelete.mockImplementation((payload) => Promise.resolve(payload));
    let app;
    const mockAccessToken = 'generated-access-token';
    const mockRefreshToken = 'generated-refresh-token';
    const mockUserToken = {
        user: mockData_1.mockUser,
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
        expiresIn: 3600
    };
    mockJWTSign.mockReturnValue(mockData_1.mockUser);
    mockJWTVerify.mockReturnValue(mockData_1.mockUser);
    beforeAll(() => {
        (0, di_config_1.setup)();
        app = (0, app_1.default)();
    });
    beforeEach(() => {
        mockJWTSign.mockReturnValueOnce(mockAccessToken);
        mockJWTSign.mockReturnValueOnce(mockRefreshToken);
        mockJWTVerify.mockReturnValue(mockUserToken);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('login', () => {
        it('should successfully create a token for user', async () => {
            const response = await (0, supertest_1.default)(app)
                .post('/auth/login/test')
                .send({
                username: 'username',
                password: 'password'
            })
                .expect(axios_1.HttpStatusCode.Ok);
            expect(response).toHaveProperty('text');
            const body = JSON.parse(response.text);
            expect(body).toHaveProperty('data');
            expect(body.data).toEqual(mockUserToken);
        });
        it('should fail because password not provided', async () => {
            await (0, supertest_1.default)(app)
                .post('/auth/login/test')
                .send({
                username: 'username'
            })
                .expect(axios_1.HttpStatusCode.BadRequest);
        });
        it('should return 404 when user not found', async () => {
            mockUsersDaoAuthenticate.mockReturnValueOnce(Promise.resolve(null));
            await (0, supertest_1.default)(app)
                .post('/auth/login/test')
                .send({
                username: 'username',
                password: 'password'
            })
                .expect(axios_1.HttpStatusCode.NotFound);
        });
    });
    describe('register', () => {
        it('should successfully register a user', async () => {
            const response = await (0, supertest_1.default)(app)
                .post('/auth/register')
                .send(mockData_1.mockRegisterUserPayload)
                .expect(axios_1.HttpStatusCode.Ok);
            expect(response).toHaveProperty('text');
            const body = JSON.parse(response.text);
            expect(body).toHaveProperty('data');
            expect(body.data).toEqual(mockUserToken);
        });
        it('should return error when password and confirmPassword is not match', async () => {
            await (0, supertest_1.default)(app)
                .post('/auth/register')
                .send({
                ...mockData_1.mockRegisterUserPayload,
                password: 'password',
                confirmPassword: 'not-match-password'
            })
                .expect(axios_1.HttpStatusCode.BadRequest);
        });
    });
    describe('refresh', () => {
        it('should successfully refresh user token', async () => {
            const response = await (0, supertest_1.default)(app)
                .post('/auth/refresh')
                .set({ Authorization: 'Bearer fake-access-token' })
                .send({ refreshToken: 'mock-refresh-token' })
                .expect(axios_1.HttpStatusCode.Ok);
            expect(response).toHaveProperty('text');
            const body = JSON.parse(response.text);
            expect(body).toHaveProperty('data');
            expect(body.data).toEqual(mockUserToken);
        });
        it('should return BadRequest when refresh token is not valid anymore', async () => {
            mockUsersDaoGet.mockReturnValueOnce(Promise.resolve(null));
            await (0, supertest_1.default)(app)
                .post('/auth/refresh')
                .set({ Authorization: 'Bearer fake-access-token' })
                .send({ refreshToken: 'mock-refresh-token' })
                .expect(axios_1.HttpStatusCode.BadRequest);
        });
    });
    describe('logout', () => {
        it('should successfully delete a user', async () => {
            const response = await (0, supertest_1.default)(app)
                .delete('/auth/logout')
                .set({ Authorization: 'Bearer fake-access-token' })
                .expect(axios_1.HttpStatusCode.Ok);
            expect(response).toHaveProperty('text');
            const body = JSON.parse(response.text);
            expect(body).toHaveProperty('data');
            expect(body.data).toEqual(true);
        });
    });
});
//# sourceMappingURL=auth.router.test.js.map