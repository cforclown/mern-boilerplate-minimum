"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const di_config_1 = require("../../di-config");
const mockData_1 = require("../../test/mockData");
const exceptions_1 = require("../../utils/exceptions");
const axios_1 = require("axios");
const mockJWTVerify = jest.fn();
jest.mock('jsonwebtoken', () => ({
    ...jest.requireActual('jsonwebtoken'),
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
jest.mock('./users.dao', () => ({
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
describe('users-router', () => {
    mockUsersDaoAuthenticate.mockReturnValue(Promise.resolve(mockData_1.mockUser));
    mockUsersDaoGet.mockReturnValue(Promise.resolve(mockData_1.mockUser));
    mockUsersDaoGetByUsername.mockReturnValue(Promise.resolve(null));
    mockUsersDaoGetByEmail.mockReturnValue(Promise.resolve(null));
    mockUsersDaoGetAll.mockReturnValue(Promise.resolve([mockData_1.mockUser]));
    mockUsersDaoGetCreate.mockReturnValue(Promise.resolve(mockData_1.mockUser));
    mockUsersDaoGetUpdate.mockReturnValue(Promise.resolve(mockData_1.mockUser));
    mockUsersDaoGetDelete.mockImplementation((payload) => Promise.resolve(payload));
    let app;
    mockJWTVerify.mockReturnValue(mockData_1.mockUser);
    beforeAll(() => {
        (0, di_config_1.setup)();
        app = di_config_1.container.resolve('app');
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('get', () => {
        it('should successfully return user', async () => {
            const response = await (0, supertest_1.default)(app)
                .get(`/api/users/${mockData_1.mockUser.id}`)
                .set({ Authorization: 'Bearer fake-access-token' })
                .expect(axios_1.HttpStatusCode.Ok);
            expect(response).toHaveProperty('text');
            const body = JSON.parse(response.text);
            expect(body).toHaveProperty('data');
            expect(body.data).toEqual(mockData_1.mockUser);
        });
        it('should return 404 when user not found', async () => {
            mockUsersDaoGet.mockReturnValueOnce(Promise.resolve(null));
            await (0, supertest_1.default)(app)
                .get(`/api/users/${mockData_1.mockUser.id}`)
                .set({ Authorization: 'Bearer fake-access-token' })
                .expect(axios_1.HttpStatusCode.NotFound);
        });
    });
    describe('getAll', () => {
        it('should successfully get all users', async () => {
            const response = await (0, supertest_1.default)(app)
                .get('/api/users')
                .set({ Authorization: 'Bearer fake-access-token' })
                .expect(axios_1.HttpStatusCode.Ok);
            expect(response).toHaveProperty('text');
            const body = JSON.parse(response.text);
            expect(body).toHaveProperty('data');
            expect(body.data).toEqual([mockData_1.mockUser]);
        });
        it('should return empty', async () => {
            mockUsersDaoGetAll.mockReturnValueOnce(Promise.resolve([]));
            const response = await (0, supertest_1.default)(app)
                .get('/api/users')
                .set({ Authorization: 'Bearer fake-access-token' })
                .expect(axios_1.HttpStatusCode.Ok);
            expect(response).toHaveProperty('text');
            const body = JSON.parse(response.text);
            expect(body).toHaveProperty('data');
            expect(body.data).toEqual([]);
        });
        it('should return internal server error', async () => {
            mockUsersDaoGetAll.mockRejectedValueOnce(new Error('error'));
            await (0, supertest_1.default)(app)
                .get('/api/users')
                .set({ Authorization: 'Bearer fake-access-token' })
                .expect(axios_1.HttpStatusCode.InternalServerError);
        });
    });
    describe('update', () => {
        it('should successfully update user', async () => {
            const response = await (0, supertest_1.default)(app)
                .patch('/api/users')
                .set({ Authorization: 'Bearer fake-access-token' })
                .send(mockData_1.mockUpdateUserPayload)
                .expect(axios_1.HttpStatusCode.Ok);
            expect(response).toHaveProperty('text');
            const body = JSON.parse(response.text);
            expect(body).toHaveProperty('data');
            expect(body.data).toEqual(mockData_1.mockUser);
        });
        it('should successfully update user when only some of the field is provided', async () => {
            const response = await (0, supertest_1.default)(app)
                .patch('/api/users')
                .set({ Authorization: 'Bearer fake-access-token' })
                .send({
                id: 'user-id',
                username: 'new-username'
            })
                .expect(axios_1.HttpStatusCode.Ok);
            expect(response).toHaveProperty('text');
            const body = JSON.parse(response.text);
            expect(body).toHaveProperty('data');
            expect(body.data).toEqual(mockData_1.mockUser);
        });
        it('should fail update user when user not found', async () => {
            mockUsersDaoGet.mockReturnValueOnce(Promise.resolve(null));
            await (0, supertest_1.default)(app)
                .patch('/api/users')
                .set({ Authorization: 'Bearer fake-access-token' })
                .send(mockData_1.mockUpdateUserPayload)
                .expect(axios_1.HttpStatusCode.BadRequest);
        });
        it('should fail update user when given username is taken', async () => {
            mockUsersDaoGetByUsername.mockReturnValueOnce(Promise.resolve(mockData_1.mockUser));
            await (0, supertest_1.default)(app)
                .patch('/api/users')
                .set({ Authorization: 'Bearer fake-access-token' })
                .send(mockData_1.mockUpdateUserPayload)
                .expect(axios_1.HttpStatusCode.BadRequest);
        });
        it('should fail update user when given email already registered', async () => {
            mockUsersDaoGetByEmail.mockReturnValueOnce(Promise.resolve(mockData_1.mockUser));
            await (0, supertest_1.default)(app)
                .patch('/api/users')
                .set({ Authorization: 'Bearer fake-access-token' })
                .send(mockData_1.mockUpdateUserPayload)
                .expect(axios_1.HttpStatusCode.BadRequest);
        });
    });
    describe('delete', () => {
        it('should successfully delete a user', async () => {
            const response = await (0, supertest_1.default)(app)
                .delete('/api/users/' + mockData_1.mockUser.id)
                .set({ Authorization: 'Bearer fake-access-token' })
                .expect(axios_1.HttpStatusCode.Ok);
            expect(response).toHaveProperty('text');
            const body = JSON.parse(response.text);
            expect(body).toHaveProperty('data');
            expect(body.data).toEqual(mockData_1.mockUser.id);
        });
        it('should throw an error when data access object throw an error', async () => {
            mockUsersDaoGetDelete.mockRejectedValueOnce(new exceptions_1.RestApiException('internal server error', 500));
            await (0, supertest_1.default)(app)
                .delete('/api/users/' + mockData_1.mockUser.id)
                .set({ Authorization: 'Bearer fake-access-token' })
                .expect(axios_1.HttpStatusCode.InternalServerError);
        });
    });
});
//# sourceMappingURL=users.router.test.js.map