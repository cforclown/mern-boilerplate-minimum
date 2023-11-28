"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_config_1 = require("../di-config");
const utils_1 = require("../utils");
const socketio_1 = __importDefault(require("../socketio"));
const awilix_1 = require("awilix");
const sio_controller_1 = __importDefault(require("../socketio/sio.controller"));
class Server {
    constructor() {
        this.db = di_config_1.container.resolve('database');
        this.app = di_config_1.container.resolve('app');
        this.sioController = di_config_1.container.resolve(sio_controller_1.default.INSTANCE_NAME);
    }
    async start() {
        try {
            utils_1.Logger.success('============================================================================');
            utils_1.Logger.success(`| ${utils_1.Environment.getNodeEnv().toUpperCase()} MODE`);
            await this.db.connect();
            utils_1.Logger.success('| ✅ SUCCESSFULLY CONNECTED TO THE DATABASE');
            const port = utils_1.Environment.getPort();
            const server = await this.app.listen(port);
            utils_1.Logger.success(`| ⚡ SERVER STARTED SUCCESSFULLY [${port}]`);
            const sio = (0, socketio_1.default)(server, this.sioController);
            di_config_1.container.register('io', (0, awilix_1.asValue)(sio));
            utils_1.Logger.success('| ⚡️ SOCKET.IO STARTED SUCCESSFULLY');
            utils_1.Logger.success('============================================================================');
        }
        catch (err) {
            if (err instanceof Error) {
                utils_1.Logger.error(err.message);
            }
        }
    }
}
exports.default = Server;
Server.INSTANCE_NAME = 'server';
//# sourceMappingURL=index.js.map