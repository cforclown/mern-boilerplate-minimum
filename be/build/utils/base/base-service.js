"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
class BaseService {
    constructor(dao) {
        this.dao = dao;
    }
    async get(id) {
        return this.dao.get(id);
    }
    async getAll() {
        return this.dao.getAll();
    }
    async create(payload) {
        return this.dao.create(payload);
    }
    async update(payload) {
        return this.dao.update(payload);
    }
    async delete(id) {
        return this.dao.delete(id);
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base-service.js.map