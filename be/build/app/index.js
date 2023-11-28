"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_flash_1 = __importDefault(require("express-flash"));
const express_session_1 = __importDefault(require("express-session"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const passport_1 = __importDefault(require("passport"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("../swagger"));
const modules_1 = require("../modules");
const utils_1 = require("../utils");
function App(authService, mainRouter) {
    const app = (0, express_1.default)();
    app.use((0, morgan_1.default)('dev'));
    app.use(express_1.default.json({ limit: '16mb' }));
    app.use(express_1.default.urlencoded({ limit: '10mb', extended: false }));
    app.use((0, cors_1.default)({
        origin: utils_1.Environment.getAllowedOrigins(),
        credentials: true
    }));
    app.use((0, express_flash_1.default)());
    app.use((0, cookie_parser_1.default)());
    app.use((0, express_session_1.default)({
        secret: utils_1.Environment.getSessionSecret(),
        resave: false,
        saveUninitialized: false,
        cookie: {
            /**
             * If we set cookie.secure set to true and we are NOT using SSL (i.e. https protocol)
             * then the cookie with the session id is not returned to
             * the browser and everything fails silently.
             */
            secure: (0, utils_1.isProduction)(utils_1.Environment.getNodeEnv())
        }
    }));
    // #region ============================ SWAGGER CONFIG =============================
    // reference: https://swagger.io/specification/#infoObject
    const swaggerDocs = (0, swagger_jsdoc_1.default)(swagger_1.default);
    app.use(`/api/${utils_1.Environment.getApiVersion()}/docs`, swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
    // #endregion -----------------------------------------------------------------------
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    (0, modules_1.InitLocalStrategy)(passport_1.default, authService);
    app.use('/', mainRouter);
    return app;
}
exports.default = App;
//# sourceMappingURL=index.js.map