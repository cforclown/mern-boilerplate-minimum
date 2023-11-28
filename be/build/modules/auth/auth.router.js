"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = exports.AUTH_BASE_API_PATH = exports.AUTH_ROUTER_INSTANCE_NAME = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = require("axios");
const passport_1 = __importDefault(require("passport"));
const utils_1 = require("../../utils");
const _1 = require(".");
exports.AUTH_ROUTER_INSTANCE_NAME = 'authRouter';
exports.AUTH_BASE_API_PATH = 'auth';
function AuthRouter(authController) {
    const router = express_1.default.Router();
    const apiVersion = utils_1.Environment.getApiVersion();
    /**
     * @swagger
     * /auth/login:
     *      post:
     *          tags:
     *              - Authentication
     *          description: Login
     *          responses:
     *              '200':
     *                  description: Login Success
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/login'
     */
    router.post('/login', passport_1.default.authenticate('local', {
        successRedirect: `/api/${apiVersion}/auth/login/verify`,
        failureRedirect: `/api/${apiVersion}/auth/login/error`,
        failureMessage: true
    }));
    router.post('/login/test', (0, utils_1.validateBody)(_1.LoginPayloadSchema), (0, utils_1.RequestHandler)(authController.login));
    router.get('/login/verify', (0, utils_1.RequestHandler)(authController.verify));
    router.get('/login/error', async (req, res) => {
        res.status(axios_1.HttpStatusCode.NotFound).send(utils_1.dro.error('The email and/or password that you have entered is incorrect'));
    });
    /**
     * @swagger
     * /auth/register:
     *      post:
     *          tags:
     *              - Authentication
     *          description: Register
     *          responses:
     *              '200':
     *                  description: Register success
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/register'
     */
    router.post('/register', (0, utils_1.validateBody)(_1.RegisterPayloadSchema), (0, utils_1.RequestHandler)(authController.register));
    /**
     * @swagger
     * /auth/refresh:
     *      post:
     *          tags:
     *              - Authentication
     *          description: Refresh Token
     *          responses:
     *              '200':
     *                  description: Access token has been refreshed
     *          security:
     *              - Bearer: []
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/refreshToken'
     */
    router.post('/refresh', (0, utils_1.validateBody)(_1.RefreshTokenPayloadSchema), (0, utils_1.RequestHandler)(authController.refresh));
    /**
     * @swagger
     * /auth/logout:
     *      delete:
     *          tags:
     *              - Authentication
     *          description: Logout success
     *          responses:
     *              '200':
     *                  description: Logout Success
     *          security:
     *              - Bearer: []
     */
    router.delete('/logout', (0, utils_1.RequestHandler)(async () => Promise.resolve(true)));
    return router;
}
exports.AuthRouter = AuthRouter;
//# sourceMappingURL=auth.router.js.map