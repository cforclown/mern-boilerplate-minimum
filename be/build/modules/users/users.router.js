"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRouter = exports.USERS_BASE_API_PATH = exports.USERS_ROUTER_INSTANCE_NAME = void 0;
const express_1 = require("express");
const utils_1 = require("../../utils");
const schemas_1 = require("../../schemas");
const users_dto_1 = require("./users.dto");
exports.USERS_ROUTER_INSTANCE_NAME = 'usersRouter';
exports.USERS_BASE_API_PATH = 'users';
function UsersRouter(usersController) {
    const router = (0, express_1.Router)();
    /**
     * @swagger
     * /api/users/{id}:
     *      get:
     *          tags:
     *              - Users
     *          description: Get user
     *          responses:
     *              '200':
     *                  description: OK
     *          security:
     *              - Bearer: []
     *          parameters:
     *              -   name: id
     *                  in: path
     *                  required: true
     */
    router.get('/:id', (0, utils_1.validateParams)(schemas_1.idSchema), (0, utils_1.RequestHandler)(usersController.get));
    /**
     * @swagger
     * /api/users:
     *      get:
     *          tags:
     *              - Users
     *          description: Get all users
     *          responses:
     *              '200':
     *                  description: OK
     *          security:
     *              - Bearer: []
     */
    router.get('/', (0, utils_1.RequestHandler)(usersController.getAll));
    /**
     * @swagger
     * /api/users:
     *      patch:
     *          tags:
     *              - Users
     *          description: Update user
     *          responses:
     *              '200':
     *                  description: OK
     *          security:
     *              - Bearer: []
     *          requestBody:
     *              description: "Update user payload"
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/updateUser'
     */
    router.patch('/', (0, utils_1.validateBody)(users_dto_1.UpdateUserPayloadSchema), (0, utils_1.RequestHandler)(usersController.update));
    /**
     * @swagger
     * /api/users:
     *      delete:
     *          tags:
     *              - Users
     *          description: Delete user
     *          responses:
     *              '200':
     *                  description: OK
     *          security:
     *              - Bearer: []
     *          parameters:
     *              -   name: id
     *                  in: path
     *                  required: true
     */
    router.delete('/:id', (0, utils_1.RequestHandler)(usersController.delete));
    return router;
}
exports.UsersRouter = UsersRouter;
//# sourceMappingURL=users.router.js.map