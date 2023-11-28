"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const users_dto_1 = require("./users.dto");
const mockData_1 = require("../../test/mockData");
describe('users-data-transfer-object', () => {
    describe('CreateUserPayloadSchema', () => {
        it('should return value when schema is valid', () => {
            const result = (0, utils_1.validateSchema)({ schema: users_dto_1.CreateUserPayloadSchema, payload: mockData_1.mockCreateUserPayload });
            expect(result).toEqual(mockData_1.mockCreateUserPayload);
        });
        it('should return value when email not provided', () => {
            const result = (0, utils_1.validateSchema)({ schema: users_dto_1.CreateUserPayloadSchema, payload: mockData_1.mockCreateUserPayload });
            expect(result).toEqual(mockData_1.mockCreateUserPayload);
        });
        it('should throw validation exception when username not provided', () => {
            expect(() => (0, utils_1.validateSchema)({
                schema: users_dto_1.CreateUserPayloadSchema,
                payload: {
                    ...mockData_1.mockCreateUserPayload,
                    username: undefined
                }
            })).toThrow(utils_1.ValidationException);
        });
        it('should throw validation exception when fullname not provided', () => {
            expect(() => (0, utils_1.validateSchema)({
                schema: users_dto_1.CreateUserPayloadSchema,
                payload: {
                    ...mockData_1.mockCreateUserPayload,
                    fullname: undefined
                }
            })).toThrow(utils_1.ValidationException);
        });
        it('should throw validation exception when role not provided', () => {
            expect(() => (0, utils_1.validateSchema)({
                schema: users_dto_1.CreateUserPayloadSchema,
                payload: {
                    ...mockData_1.mockCreateUserPayload,
                    role: undefined
                }
            })).toThrow(utils_1.ValidationException);
        });
        it('should throw validation exception when email is invalid not provided', () => {
            expect(() => (0, utils_1.validateSchema)({
                schema: users_dto_1.CreateUserPayloadSchema,
                payload: {
                    ...mockData_1.mockCreateUserPayload,
                    email: 'invalid email'
                }
            })).toThrow(utils_1.ValidationException);
        });
    });
    describe('UpdateProfilePayloadSchema', () => {
        it('should return value when schema is valid', () => {
            expect((0, utils_1.validateSchema)({
                schema: users_dto_1.UpdateUserPayloadSchema,
                payload: mockData_1.mockUpdateUserPayload
            })).toEqual(mockData_1.mockUpdateUserPayload);
            expect((0, utils_1.validateSchema)({
                schema: users_dto_1.UpdateUserPayloadSchema,
                payload: {
                    id: 'user-id',
                    fullname: 'fullname'
                }
            })).toEqual({
                id: 'user-id',
                fullname: 'fullname'
            });
        });
        it('should allow payload only contain id', () => {
            const result = (0, utils_1.validateSchema)({ schema: users_dto_1.UpdateUserPayloadSchema, payload: { id: 'user-id' } });
            expect(result).toEqual({ id: 'user-id' });
        });
        it('should throw validation exception when payload is not object', () => {
            expect(() => (0, utils_1.validateSchema)({ schema: users_dto_1.UpdateUserPayloadSchema, payload: null })).toThrow(utils_1.ValidationException);
        });
    });
});
//# sourceMappingURL=users.dto.test.js.map