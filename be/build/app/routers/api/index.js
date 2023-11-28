"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRouter = void 0;
const express_1 = require("express");
const modules_1 = require("../../../modules");
const utils_1 = require("../../../utils");
function ApiRouter(authRouter, usersRouter, schedulesRouter) {
    const router = (0, express_1.Router)();
    const apiVersion = utils_1.Environment.getApiVersion();
    router.use((0, modules_1.authenticateRequest)([
        { path: `/api/${apiVersion}/auth` },
        { path: `/api/${apiVersion}/users/avatar` }
    ]));
    router.use(`/${modules_1.AUTH_BASE_API_PATH}`, authRouter);
    router.use(`/${modules_1.USERS_BASE_API_PATH}`, usersRouter);
    router.use(`/${modules_1.SCHEDULES_BASE_API_PATH}`, schedulesRouter);
    return router;
}
exports.ApiRouter = ApiRouter;
//# sourceMappingURL=index.js.map