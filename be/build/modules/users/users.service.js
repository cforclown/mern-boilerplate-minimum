"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const utils_1 = require("../../utils");
class UsersService {
    constructor(usersDao) {
        this.usersDao = usersDao;
    }
    async authenticate({ username, password }) {
        return this.usersDao.authenticate({
            username,
            password: (await (0, utils_1.hashPassword)(password))
        });
    }
    get(userId) {
        return this.usersDao.get(userId);
    }
    getAll() {
        return this.usersDao.getAll();
    }
    async create(payload) {
        const [isUsernameTaken, isEmailRegistered] = await Promise.all([
            this.usersDao.getByUsername(payload.username),
            this.usersDao.getByEmail(payload.email)
        ]);
        if (isUsernameTaken) {
            throw new utils_1.RestApiException('Username is taken');
        }
        if (isEmailRegistered) {
            throw new utils_1.RestApiException('Email already registered');
        }
        return this.usersDao.create(payload);
    }
    async update(userId, payload) {
        const [user, isUsernameTaken, isEmailRegistered] = await Promise.all([
            this.usersDao.get(userId),
            payload.username ? this.usersDao.getByUsername(payload.username) : false,
            payload.email ? this.usersDao.getByEmail(payload.email) : false
        ]);
        if (!user) {
            throw new utils_1.RestApiException('User not found');
        }
        if (isUsernameTaken && user.username !== payload.username) {
            throw new utils_1.RestApiException('Username is taken');
        }
        if (isEmailRegistered && user.email !== payload.email) {
            throw new utils_1.RestApiException('Email already registered');
        }
        return this.usersDao.update({ id: userId, ...payload });
    }
    async changePassword(userId, payload) {
        const user = await this.usersDao.get(userId);
        if (!user) {
            throw new utils_1.RestApiException('User not found');
        }
        if (user.password !== (await (0, utils_1.hashPassword)(payload.currentPassword))) {
            throw new utils_1.RestApiException('Password does not match');
        }
        if (payload.newPassword !== payload.confirmNewPassword) {
            throw new utils_1.RestApiException('New password and confirmation password is does not match');
        }
        return this.usersDao.update({ id: user._id, password: (await (0, utils_1.hashPassword)(payload.newPassword)) });
    }
    delete(userId) {
        return this.usersDao.delete(userId);
    }
}
exports.UsersService = UsersService;
UsersService.INSTANCE_NAME = 'usersService';
//# sourceMappingURL=users.service.js.map