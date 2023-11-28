"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersSchema = void 0;
const mongoose_1 = require("mongoose");
const utils_1 = require("../../utils");
exports.usersSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    email: { type: String, required: false, default: null },
    avatar: {
        type: {
            data: { type: String, required: true },
            filename: { type: String, required: true }
        },
        required: false,
        default: null
    },
    archived: { type: Boolean, required: false, default: false }
});
// virtualize _id to id when doing query
exports.usersSchema.virtual('id').get(function () {
    return this._id.toString();
});
// Ensure virtual fields are serialised.
exports.usersSchema.set('toJSON', {
    virtuals: true
});
exports.usersSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            const hash = await (0, utils_1.hashPassword)(this.password);
            this.password = hash;
        }
        next();
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=users.schema.js.map