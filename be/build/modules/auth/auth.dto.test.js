"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const auth_dto_1 = require("./auth.dto");
describe('auth-data-transfer-object', () => {
    const loginPayload = {
        username: 'username',
        password: 'password'
    };
    describe('LoginPayloadSchema', () => {
        it('should return value when schema is valid', () => {
            const result = (0, utils_1.validateSchema)({ schema: auth_dto_1.LoginPayloadSchema, payload: loginPayload });
            expect(result).toEqual(loginPayload);
        });
        it('should throw validation exception when password not provided', () => {
            expect(() => (0, utils_1.validateSchema)({
                schema: auth_dto_1.LoginPayloadSchema,
                payload: {
                    username: 'username'
                }
            })).toThrow(utils_1.ValidationException);
        });
        it('should throw validation exception when password not provided', () => {
            expect(() => (0, utils_1.validateSchema)({
                schema: auth_dto_1.LoginPayloadSchema,
                payload: {
                    password: 'password'
                }
            })).toThrow(utils_1.ValidationException);
        });
    });
    describe('RefreshTokenPayloadSchema', () => {
        it('should return value when schema is valid', () => {
            const result = (0, utils_1.validateSchema)({ schema: auth_dto_1.RefreshTokenPayloadSchema, payload: { refreshToken: 'refreshToken' } });
            expect(result).toEqual({ refreshToken: 'refreshToken' });
        });
        it('should throw validation exception when refreshToken not provided', () => {
            expect(() => (0, utils_1.validateSchema)({ schema: auth_dto_1.RefreshTokenPayloadSchema, payload: {} })).toThrow(utils_1.ValidationException);
        });
    });
});
//# sourceMappingURL=auth.dto.test.js.map