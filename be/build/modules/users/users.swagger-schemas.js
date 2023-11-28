"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersSwaggerSchemas = void 0;
exports.UsersSwaggerSchemas = {
    updateUser: {
        type: 'object',
        properties: {
            username: {
                type: 'string',
                default: null
            },
            email: {
                type: 'string',
                default: null
            },
            fullname: {
                type: 'string',
                default: null
            }
        }
    },
    changePassword: {
        type: 'object',
        properties: {
            currentPassword: { type: 'string', required: true },
            newPassword: { type: 'string', required: true },
            confirmNewPassword: { type: 'string', required: true }
        }
    }
};
//# sourceMappingURL=users.swagger-schemas.js.map