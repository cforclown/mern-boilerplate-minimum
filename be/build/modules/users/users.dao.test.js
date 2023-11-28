"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const utils_1 = require("../../utils");
const mockData_1 = require("../../test/mockData");
const mockMongooseModel_1 = require("../../test/mockMongooseModel");
jest.mock('mongoose', () => ({
    ...jest.requireActual('mongoose'),
    model: jest.fn().mockImplementation(() => mockMongooseModel_1.MockMongooseModel)
}));
describe('users-dao', () => {
    mockMongooseModel_1.MockMongooseModel.mockExec.mockReturnValue(Promise.resolve(mockData_1.mockUser));
    mockMongooseModel_1.MockMongooseModel.mockSelect.mockImplementation(() => ({
        exec: () => mockMongooseModel_1.MockMongooseModel.mockExec()
    }));
    mockMongooseModel_1.MockMongooseModel.mockFindById.mockImplementation(() => ({
        select: (payload) => mockMongooseModel_1.MockMongooseModel.mockSelect(payload)
    }));
    mockMongooseModel_1.MockMongooseModel.mockFindOne.mockImplementation(() => ({
        select: (payload) => mockMongooseModel_1.MockMongooseModel.mockSelect(payload)
    }));
    mockMongooseModel_1.MockMongooseModel.mockCreate.mockReturnValue(Promise.resolve(mockData_1.mockUser));
    mockMongooseModel_1.MockMongooseModel.mockFindOneAndUpdate.mockImplementation(() => ({
        exec: () => mockMongooseModel_1.MockMongooseModel.mockExec()
    }));
    mockMongooseModel_1.MockMongooseModel.mockFindOneAndDelete.mockImplementation(() => ({
        exec: () => mockMongooseModel_1.MockMongooseModel.mockExec()
    }));
    const usersDao = new _1.UsersDao();
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('authenticate', () => {
        it('should successfully authenticate user', async () => {
            const user = await usersDao.authenticate({ username: 'username', password: 'password' });
            expect(mockMongooseModel_1.MockMongooseModel.mockFindOne).toHaveBeenCalled();
            expect(user).toEqual(mockData_1.mockUser);
        });
        it('should throw an error when user not found', async () => {
            mockMongooseModel_1.MockMongooseModel.mockExec.mockReturnValueOnce(Promise.resolve(null));
            const user = await usersDao.authenticate({ username: 'username', password: 'password' });
            expect(user).toEqual(null);
        });
        it('should throw an error when model.findOne throw an error', async () => {
            mockMongooseModel_1.MockMongooseModel.mockExec.mockRejectedValueOnce(new Error('error'));
            await expect(usersDao.authenticate({ username: 'username', password: 'password' })).rejects.toThrowError();
        });
    });
    describe('get', () => {
        it('should successfully get user', async () => {
            const user = await usersDao.get(mockData_1.mockUser.id);
            expect(mockMongooseModel_1.MockMongooseModel.mockFindOne).toHaveBeenCalled();
            expect(user).toEqual(mockData_1.mockUser);
        });
        it('should throw an error when user not found', async () => {
            mockMongooseModel_1.MockMongooseModel.mockExec.mockReturnValueOnce(Promise.resolve(null));
            const user = await usersDao.get(mockData_1.mockUser.id);
            expect(user).toEqual(null);
        });
        it('should throw an error when model.findById throw an error', async () => {
            mockMongooseModel_1.MockMongooseModel.mockExec.mockRejectedValueOnce(new Error('error'));
            await expect(usersDao.get(mockData_1.mockUser.id)).rejects.toThrowError();
        });
    });
    describe('getByUsername', () => {
        it('should successfully return a user', async () => {
            const user = await usersDao.getByUsername('mock-username');
            expect(mockMongooseModel_1.MockMongooseModel.mockFindOne).toHaveBeenCalled();
            expect(user).toEqual(mockData_1.mockUser);
        });
        it('should throw an error when user not found', async () => {
            mockMongooseModel_1.MockMongooseModel.mockExec.mockReturnValueOnce(Promise.resolve(null));
            const user = await usersDao.getByUsername('mock-username');
            expect(user).toEqual(null);
        });
        it('should throw an error when model.findOne throw an error', async () => {
            mockMongooseModel_1.MockMongooseModel.mockExec.mockRejectedValueOnce(new Error('error'));
            await expect(usersDao.getByUsername('mock-username')).rejects.toThrowError();
        });
    });
    describe('getByEmail', () => {
        it('should successfully return a user', async () => {
            const user = await usersDao.getByEmail('mock-email');
            expect(mockMongooseModel_1.MockMongooseModel.mockFindOne).toHaveBeenCalled();
            expect(user).toEqual(mockData_1.mockUser);
        });
        it('should throw an error when user not found', async () => {
            mockMongooseModel_1.MockMongooseModel.mockExec.mockReturnValueOnce(Promise.resolve(null));
            const user = await usersDao.getByEmail('mock-email');
            expect(user).toEqual(null);
        });
        it('should throw an error when model.findOne throw an error', async () => {
            mockMongooseModel_1.MockMongooseModel.mockExec.mockRejectedValueOnce(new Error('error'));
            await expect(usersDao.getByEmail('mock-email')).rejects.toThrowError();
        });
    });
    describe('create', () => {
        it('should successfully create an user', async () => {
            const user = await usersDao.create({ ...mockData_1.mockCreateUserPayload });
            expect(user).toEqual(mockData_1.mockUser);
        });
        it('should throw an error', async () => {
            mockMongooseModel_1.MockMongooseModel.mockCreate.mockRejectedValueOnce(new utils_1.RestApiException('error'));
            await expect(usersDao.create({ ...mockData_1.mockCreateUserPayload })).rejects.toThrow(utils_1.RestApiException);
        });
    });
    describe('update', () => {
        const mockSave = jest.fn();
        beforeEach(() => {
            mockMongooseModel_1.MockMongooseModel.mockExec.mockReturnValue(Promise.resolve({
                ...mockData_1.mockUser,
                save: () => mockSave()
            }));
            mockMongooseModel_1.MockMongooseModel.mockFindById.mockImplementation(() => ({
                exec: () => mockMongooseModel_1.MockMongooseModel.mockExec()
            }));
        });
        it('should successfully update user', async () => {
            const user = await usersDao.update(mockData_1.mockUpdateUserPayload);
            expect(mockMongooseModel_1.MockMongooseModel.mockFindById).toHaveBeenCalled();
            expect(mockSave).toHaveBeenCalled();
            expect(user).toEqual(expect.objectContaining({
                ...mockData_1.mockUser,
                ...mockData_1.mockUpdateUserPayload
            }));
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('should successfully update only users username', async () => {
            const user = await usersDao.update({
                id: 'id',
                username: 'username'
            });
            expect(mockMongooseModel_1.MockMongooseModel.mockFindById).toHaveBeenCalled();
            expect(mockSave).toHaveBeenCalled();
            expect(user).toEqual(expect.objectContaining({
                ...mockData_1.mockUser,
                username: 'username'
            }));
        });
        it('should throw an error when user not found', async () => {
            mockMongooseModel_1.MockMongooseModel.mockExec.mockReturnValueOnce(Promise.resolve(null));
            await expect(usersDao.update(mockData_1.mockUpdateUserPayload)).rejects.toThrow(utils_1.RestApiException);
        });
        it('should throw an error when document.save() throw an error', async () => {
            mockSave.mockRejectedValueOnce(new Error());
            await expect(usersDao.update(mockData_1.mockUpdateUserPayload)).rejects.toThrowError();
        });
    });
    describe('delete', () => {
        it('should successfully delete user', async () => {
            const deletedUserId = await usersDao.delete('user-id');
            expect(mockMongooseModel_1.MockMongooseModel.mockFindOneAndUpdate).toHaveBeenCalled();
            expect(deletedUserId).toEqual('user-id');
        });
        it('should throw api error when deletedCount is 0', async () => {
            mockMongooseModel_1.MockMongooseModel.mockExec.mockReturnValueOnce(Promise.resolve(null));
            await expect(usersDao.delete('user-id')).rejects.toThrow(utils_1.RestApiException);
        });
        it('should throw an error when model.deleteOne throw an error', async () => {
            mockMongooseModel_1.MockMongooseModel.mockExec.mockRejectedValueOnce(new Error());
            await expect(usersDao.get(mockData_1.mockUser.id)).rejects.toThrowError();
        });
    });
});
//# sourceMappingURL=users.dao.test.js.map