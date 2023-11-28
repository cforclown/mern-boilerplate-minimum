"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockMongooseModel = void 0;
class MockMongooseModel {
    constructor(payload) {
        this.payload = payload;
    }
    save() {
        return MockMongooseModel.mockSave();
    }
    populate() {
        return MockMongooseModel.mockPopulate();
    }
}
exports.MockMongooseModel = MockMongooseModel;
_a = MockMongooseModel;
MockMongooseModel.mockAggregate = jest.fn();
MockMongooseModel.mockDeleteOne = jest.fn();
MockMongooseModel.mockExec = jest.fn();
MockMongooseModel.mockFindById = jest.fn();
MockMongooseModel.mockFindOne = jest.fn();
MockMongooseModel.mockPopulate = jest.fn();
MockMongooseModel.mockSave = jest.fn();
MockMongooseModel.mockSelect = jest.fn();
MockMongooseModel.mockUpdateMany = jest.fn();
MockMongooseModel.mockUpdateOne = jest.fn();
MockMongooseModel.mockCreate = jest.fn();
MockMongooseModel.mockFindByIdAndUpdate = jest.fn();
MockMongooseModel.mockFindOneAndUpdate = jest.fn();
MockMongooseModel.mockFindOneAndDelete = jest.fn();
MockMongooseModel.exec = (payload) => _a.mockExec(payload);
MockMongooseModel.select = (payload) => _a.mockSelect(payload);
MockMongooseModel.findOne = (payload) => _a.mockFindOne(payload);
MockMongooseModel.findById = (payload) => _a.mockFindById(payload);
MockMongooseModel.updateOne = (payload) => _a.mockUpdateOne(payload);
MockMongooseModel.updateMany = (payload) => _a.mockUpdateMany(payload);
MockMongooseModel.aggregate = (payload) => _a.mockAggregate(payload);
MockMongooseModel.populate = (payload) => _a.mockPopulate(payload);
MockMongooseModel.save = (payload) => _a.mockSave(payload);
MockMongooseModel.create = (payload) => _a.mockCreate(payload);
MockMongooseModel.findByIdAndUpdate = (payload) => _a.mockFindByIdAndUpdate(payload);
MockMongooseModel.findOneAndUpdate = (payload) => _a.mockFindOneAndUpdate(payload);
MockMongooseModel.deleteOne = (payload) => _a.mockDeleteOne(payload);
MockMongooseModel.findOneAndDelete = (payload) => _a.mockFindOneAndDelete(payload);
//# sourceMappingURL=mockMongooseModel.js.map