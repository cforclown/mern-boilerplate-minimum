"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRouter = void 0;
const express_1 = require("express");
const utils_1 = require("../../utils");
function MainRouter(apiRouter) {
    const router = (0, express_1.Router)();
    router.use(`/api/${utils_1.Environment.getApiVersion()}`, apiRouter);
    return router;
}
exports.MainRouter = MainRouter;
//# sourceMappingURL=index.js.map