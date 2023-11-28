"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersDao = void 0;
const mongoose_1 = require("mongoose");
const axios_1 = require("axios");
const utils_1 = require("../../utils");
class UsersDao {
    constructor() {
        this.model = (0, mongoose_1.model)('users');
    }
    async authenticate({ username, password }) {
        return this.model.findOne({
            $or: [
                { username },
                { email: username }
            ],
            password,
            archived: false
        }).select('-password').exec();
    }
    async get(userId) {
        return this.model.findOne({ _id: userId, archived: false }).select('-password').exec();
    }
    async getByUsername(username) {
        return this.model.findOne({ username, archived: false }).select('-password').exec();
    }
    async getByEmail(email) {
        return this.model.findOne({ email, archived: false }).select('-password').exec();
    }
    async getAll() {
        return this.model.find({ archived: false }).exec();
    }
    async create(payload) {
        return this.model.create({ ...payload });
    }
    async update(payload) {
        const user = await this.model.findById(payload.id).exec();
        if (!user) {
            throw new utils_1.RestApiException('User not found', axios_1.HttpStatusCode.NotFound);
        }
        user.username = payload.username ?? user.username;
        user.email = payload.email ?? user.email;
        user.fullname = payload.fullname ?? user.fullname;
        user.password = payload.password ?? user.password;
        await user.save();
        return user;
    }
    async delete(userId) {
        const deletedUser = await this.model.findOneAndUpdate({ _id: userId }, { archived: true }).exec();
        if (!deletedUser) {
            throw new utils_1.RestApiException('User not found', axios_1.HttpStatusCode.NotFound);
        }
        return deletedUser._id;
    }
}
exports.UsersDao = UsersDao;
UsersDao.INSTANCE_NAME = 'usersDao';
//# sourceMappingURL=users.dao.js.map