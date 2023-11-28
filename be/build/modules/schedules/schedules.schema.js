"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedulesSchema = void 0;
const mongoose_1 = require("mongoose");
exports.schedulesSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: false, default: null },
    desc: { type: String, required: false, default: null }
});
// virtualize _id to id when doing query
exports.schedulesSchema.virtual('id').get(function () {
    return this._id.toString();
});
// Ensure virtual fields are serialised.
exports.schedulesSchema.set('toJSON', {
    virtuals: true
});
//# sourceMappingURL=schedules.schema.js.map