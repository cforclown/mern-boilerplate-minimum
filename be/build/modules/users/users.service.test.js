"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const mockData_1 = require("../../test/mockData");
const utils_1 = require("../../utils");
const users_service_1 = require("./users.service");
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
jest.mock('mongoose', () => ({
    ...jest.requireActual('mongoose'),
    model: jest.fn().mockImplementation(() => ({}))
}));
describe('users-service', () => {
    mockUsersDaoAuthenticate.mockReturnValue(Promise.resolve(mockData_1.mockUser));
    mockUsersDaoGet.mockReturnValue(Promise.resolve(mockData_1.mockUser));
    mockUsersDaoGetByUsername.mockReturnValue(Promise.resolve(null));
    mockUsersDaoGetByEmail.mockReturnValue(Promise.resolve(null));
    mockUsersDaoGetAll.mockReturnValue(Promise.resolve([mockData_1.mockUser]));
    mockUsersDaoGetCreate.mockReturnValue(Promise.resolve(mockData_1.mockUser));
    mockUsersDaoGetUpdate.mockReturnValue(Promise.resolve(mockData_1.mockUser));
    mockUsersDaoGetDelete.mockImplementation((payload) => Promise.resolve(payload));
    const usersService = new users_service_1.UsersService({
        usersDao: new _1.UsersDao()
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('authenticate', () => {
        it('should successfully return user', async () => {
            const user = await usersService.authenticate({ username: 'username', password: 'password' });
            expect(mockUsersDaoAuthenticate).toHaveBeenCalled();
            expect(user).toEqual(mockData_1.mockUser);
        });
        it('should throw an error when user not found', async () => {
            mockUsersDaoAuthenticate.mockReturnValueOnce(null);
            const user = await usersService.authenticate({ username: 'username', password: 'password' });
            expect(user).toEqual(null);
        });
    });
    describe('get getAll', () => {
        it('should successfully return user', async () => {
            expect(await usersService.get(mockData_1.mockUser.id)).toEqual(mockData_1.mockUser);
            expect(await usersService.getAll()).toEqual([mockData_1.mockUser]);
        });
        it('should return null when user not found', async () => {
            mockUsersDaoGet.mockReturnValueOnce(null);
            expect(await usersService.get(mockData_1.mockUser.id)).toEqual(null);
        });
    });
    describe('create', () => {
        it('should successfully create a user', async () => {
            expect(await usersService.create(mockData_1.mockCreateUserPayload)).toEqual(mockData_1.mockUser);
        });
        it('should throw an error when username is taken', async () => {
            mockUsersDaoGetByUsername.mockReturnValueOnce(mockData_1.mockUser);
            await expect(usersService.create(mockData_1.mockCreateUserPayload)).rejects.toThrow(utils_1.RestApiException);
        });
        it('should throw RestApiException when email already registered', async () => {
            mockUsersDaoGetByEmail.mockReturnValueOnce(Promise.resolve(mockData_1.mockUser));
            await expect(usersService.create(mockData_1.mockCreateUserPayload)).rejects.toThrow(utils_1.RestApiException);
        });
    });
    describe('update', () => {
        it('should successfully update a user', async () => {
            expect(await usersService.update(mockData_1.mockUpdateUserPayload)).toEqual(mockData_1.mockUser);
        });
        it('should throw an error when username is taken', async () => {
            mockUsersDaoGetByUsername.mockReturnValueOnce(mockData_1.mockUser);
            await expect(usersService.update(mockData_1.mockUpdateUserPayload)).rejects.toThrow(utils_1.RestApiException);
        });
        it('should throw RestApiException when email already registered', async () => {
            mockUsersDaoGetByEmail.mockReturnValueOnce(Promise.resolve(mockData_1.mockUser));
            await expect(usersService.update(mockData_1.mockUpdateUserPayload)).rejects.toThrow(utils_1.RestApiException);
        });
    });
    describe('delete', () => {
        it('should successfully delete a user', async () => {
            expect(await usersService.delete('user-id')).toEqual('user-id');
        });
    });
});
//# sourceMappingURL=users.service.test.js.map