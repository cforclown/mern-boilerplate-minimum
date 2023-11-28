"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const exceptions_1 = require("../exceptions");
const axios_1 = require("axios");
class BaseController {
    constructor(service) {
        this.service = service;
        this.get = this.get.bind(this);
        this.getAll = this.getAll.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    async get({ params }) {
        const doc = await this.service.get(params.id);
        if (!doc) {
            throw new exceptions_1.RestApiException('Document not found', axios_1.HttpStatusCode.NotFound);
        }
        return doc;
    }
    async getAll() {
        return this.service.getAll();
    }
    async create({ body }) {
        return this.service.create(body);
    }
    async update({ body }) {
        const doc = await this.service.update(body);
        if (!doc) {
            throw new exceptions_1.RestApiException('Document not found', axios_1.HttpStatusCode.NotFound);
        }
        return doc;
    }
    async delete({ params }) {
        const doc = await this.service.delete(params.id);
        if (!doc) {
            throw new exceptions_1.RestApiException('Document not found', axios_1.HttpStatusCode.NotFound);
        }
        return doc;
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=base-controller.js.map