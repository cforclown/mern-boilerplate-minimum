"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordPayloadSchema = exports.UpdateUserPayloadSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.UpdateUserPayloadSchema = joi_1.default.object({
    username: joi_1.default.string(),
    email: joi_1.default.string().email(),
    fullname: joi_1.default.string()
});
exports.ChangePasswordPayloadSchema = joi_1.default.object({
    currentPassword: joi_1.default.string().required(),
    newPassword: joi_1.default.string().required(),
    confirmNewPassword: joi_1.default.string().required()
});
//# sourceMappingURL=users.dto.js.map