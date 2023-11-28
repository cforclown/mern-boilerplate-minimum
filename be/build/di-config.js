"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = exports.container = void 0;
const awilix_1 = require("awilix");
const modules_1 = require("./modules");
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./database"));
const routers_1 = require("./app/routers");
const api_1 = require("./app/routers/api");
const sio_controller_1 = __importDefault(require("./socketio/sio.controller"));
const sio_service_1 = __importDefault(require("./socketio/sio.service"));
exports.container = (0, awilix_1.createContainer)({
    injectionMode: awilix_1.InjectionMode.CLASSIC
});
function setup() {
    exports.container.register({
        app: (0, awilix_1.asFunction)(app_1.default),
        mainRouter: (0, awilix_1.asFunction)(routers_1.MainRouter),
        apiRouter: (0, awilix_1.asFunction)(api_1.ApiRouter),
        [database_1.default.INSTANCE_NAME]: (0, awilix_1.asClass)(database_1.default),
        [sio_controller_1.default.INSTANCE_NAME]: (0, awilix_1.asClass)(sio_controller_1.default),
        [sio_service_1.default.INSTANCE_NAME]: (0, awilix_1.asClass)(sio_service_1.default),
        [modules_1.AUTH_ROUTER_INSTANCE_NAME]: (0, awilix_1.asFunction)(modules_1.AuthRouter),
        [modules_1.AuthController.INSTANCE_NAME]: (0, awilix_1.asClass)(modules_1.AuthController),
        [modules_1.AuthService.INSTANCE_NAME]: (0, awilix_1.asClass)(modules_1.AuthService),
        [modules_1.USERS_ROUTER_INSTANCE_NAME]: (0, awilix_1.asFunction)(modules_1.UsersRouter),
        [modules_1.UsersController.INSTANCE_NAME]: (0, awilix_1.asClass)(modules_1.UsersController),
        [modules_1.UsersService.INSTANCE_NAME]: (0, awilix_1.asClass)(modules_1.UsersService),
        [modules_1.UsersDao.INSTANCE_NAME]: (0, awilix_1.asClass)(modules_1.UsersDao),
        [modules_1.SCHEDULES_ROUTER_INSTANCE_NAME]: (0, awilix_1.asFunction)(modules_1.SchedulesRouter),
        [modules_1.SchedulesController.INSTANCE_NAME]: (0, awilix_1.asClass)(modules_1.SchedulesController),
        [modules_1.SchedulesService.INSTANCE_NAME]: (0, awilix_1.asClass)(modules_1.SchedulesService),
        [modules_1.SchedulesDao.INSTANCE_NAME]: (0, awilix_1.asClass)(modules_1.SchedulesDao)
    });
}
exports.setup = setup;
//# sourceMappingURL=di-config.js.map