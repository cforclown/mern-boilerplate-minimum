"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDataAccessObject = void 0;
class BaseDataAccessObject {
    constructor(model) {
        this.model = model;
    }
    async get(id) {
        return this.model.findById(id).exec();
    }
    async getAll() {
        return this.model.find({}).exec();
    }
    async create(payload) {
        return this.model.create({ ...payload });
    }
    async update(payload) {
        return this.model.findOneAndUpdate({ _id: payload.id }, { ...payload }, { new: true }).exec();
    }
    async delete(id) {
        return this.model.findOneAndDelete({ _id: id }, { new: true }).exec();
    }
}
exports.BaseDataAccessObject = BaseDataAccessObject;
//# sourceMappingURL=base-dao-mongo.js.map