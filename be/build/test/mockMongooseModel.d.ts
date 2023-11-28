/// <reference types="jest" />
export declare class MockMongooseModel {
    static mockAggregate: jest.Mock;
    static mockDeleteOne: jest.Mock;
    static mockExec: jest.Mock;
    static mockFindById: jest.Mock;
    static mockFindOne: jest.Mock;
    static mockPopulate: jest.Mock;
    static mockSave: jest.Mock;
    static mockSelect: jest.Mock;
    static mockUpdateMany: jest.Mock;
    static mockUpdateOne: jest.Mock;
    static mockCreate: jest.Mock;
    static mockFindByIdAndUpdate: jest.Mock;
    static mockFindOneAndUpdate: jest.Mock;
    static mockFindOneAndDelete: jest.Mock;
    payload: any;
    constructor(payload: any);
    save(): void;
    populate(): void;
    static exec: (payload: any) => void;
    static select: (payload: any) => void;
    static findOne: (payload: any) => void;
    static findById: (payload: any) => void;
    static updateOne: (payload: any) => void;
    static updateMany: (payload: any) => void;
    static aggregate: (payload: any) => void;
    static populate: (payload: any) => void;
    static save: (payload: any) => void;
    static create: (payload: any) => void;
    static findByIdAndUpdate: (payload: any) => void;
    static findOneAndUpdate: (payload: any) => void;
    static deleteOne: (payload: any) => void;
    static findOneAndDelete: (payload: any) => void;
}
