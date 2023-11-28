"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const di_config_1 = require("./di-config");
const utils_1 = require("./utils");
try {
    (0, di_config_1.setup)();
    (0, utils_1.config)();
    new server_1.default().start();
}
catch (err) {
    if (err instanceof Error) {
        utils_1.Logger.error(err.message, utils_1.ELogLevel.ERROR);
    }
}
//# sourceMappingURL=index.js.map