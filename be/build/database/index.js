"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("../utils");
const modules_1 = require("../modules");
class Database {
    constructor() {
        this.connect = this.connect.bind(this);
        this.registerModels();
    }
    async connect() {
        await mongoose_1.default.connect(utils_1.Environment.getDBConnectionString());
    }
    close() {
        mongoose_1.default.disconnect();
    }
    registerModels() {
        mongoose_1.default.model('users', modules_1.usersSchema);
        mongoose_1.default.model('schedules', modules_1.schedulesSchema);
    }
}
Database.INSTANCE_NAME = 'database';
exports.default = Database;
//# sourceMappingURL=index.js.map