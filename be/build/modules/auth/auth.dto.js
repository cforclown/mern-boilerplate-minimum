"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenPayloadSchema = exports.RegisterPayloadSchema = exports.LoginPayloadSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.LoginPayloadSchema = joi_1.default.object({
    username: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.string().email()).required(),
    password: joi_1.default.string().required()
});
exports.RegisterPayloadSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    fullname: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    confirmPassword: joi_1.default.string().required()
});
exports.RefreshTokenPayloadSchema = joi_1.default.object({
    refreshToken: joi_1.default.string().required()
});
//# sourceMappingURL=auth.dto.js.map