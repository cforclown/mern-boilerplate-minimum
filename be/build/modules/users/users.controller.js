"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const axios_1 = require("axios");
const utils_1 = require("../../utils");
class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
        this.get = this.get.bind(this);
        this.getAll = this.getAll.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    async get({ params }) {
        const user = await this.usersService.get(params.id);
        if (!user) {
            throw new utils_1.RestApiException('User not found', axios_1.HttpStatusCode.NotFound);
        }
        return user;
    }
    async getAll() {
        return this.usersService.getAll();
    }
    async update({ user, body }) {
        return this.usersService.update(user.user.id, body);
    }
    async changePassword({ user, body }) {
        return this.usersService.changePassword(user.user.id, body);
    }
    async delete({ params }) {
        return this.usersService.delete(params.id);
    }
}
exports.UsersController = UsersController;
UsersController.INSTANCE_NAME = 'usersController';
//# sourceMappingURL=users.controller.js.map