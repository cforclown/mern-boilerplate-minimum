"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulesRouter = exports.SCHEDULES_BASE_API_PATH = exports.SCHEDULES_ROUTER_INSTANCE_NAME = void 0;
const express_1 = require("express");
const utils_1 = require("../../utils");
const schedules_dto_1 = require("./schedules.dto");
const schemas_1 = require("../../schemas");
exports.SCHEDULES_ROUTER_INSTANCE_NAME = 'schedulesRouter';
exports.SCHEDULES_BASE_API_PATH = 'schedules';
function SchedulesRouter(schedulesController) {
    const router = (0, express_1.Router)();
    /**
     * @swagger
     * /api/v1/schedules/{id}:
     *      get:
     *          tags:
     *              - Schedules
     *          description: Get schedule
     *          responses:
     *              '200':
     *                  description: OK
     *          parameters:
     *              -   name: id
     *                  in: path
     *                  required: true
     */
    router.get('/:id', (0, utils_1.validateParams)(schemas_1.idSchema), (0, utils_1.RequestHandler)(schedulesController.get));
    /**
     * @swagger
     * /api/v1/schedules:
     *      get:
     *          tags:
     *              - Schedules
     *          description: Get all schedules
     *          responses:
     *              '200':
     *                  description: OK
     */
    router.get('/', (0, utils_1.RequestHandler)(schedulesController.getAll));
    /**
     * @swagger
     * /api/v1/schedules/explore:
     *      post:
     *          tags:
     *              - Schedules
     *          description: Explore schedules with pagination
     *          responses:
     *              '200':
     *                  description: OK
     *          requestBody:
     *              description: "Exploration payload"
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/explorationPayload'
     */
    router.post('/explore', (0, utils_1.validateBody)(utils_1.ExplorationPayloadSchema), (0, utils_1.RequestHandler)(schedulesController.explore));
    /**
     * @swagger
     * /api/v1/schedules:
     *      post:
     *          tags:
     *              - Schedules
     *          description: Create schedule
     *          responses:
     *              '200':
     *                  description: OK
     *          requestBody:
     *              description: "Create schedule payload"
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/createSchedule'
     */
    router.post('/', (0, utils_1.validateBody)(schedules_dto_1.CreateSchedulePayloadSchema), (0, utils_1.RequestHandler)(schedulesController.create));
    /**
     * @swagger
     * /api/v1/schedules:
     *      patch:
     *          tags:
     *              - Schedules
     *          description: Update schedule
     *          responses:
     *              '200':
     *                  description: OK
     *          requestBody:
     *              description: "Update schedule payload"
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/updateSchedule'
     */
    router.patch('/', (0, utils_1.validateBody)(schedules_dto_1.UpdateSchedulePayloadSchema), (0, utils_1.RequestHandler)(schedulesController.update));
    /**
     * @swagger
     * /api/v1/schedules:
     *      delete:
     *          tags:
     *              - Schedules
     *          description: Delete schedule
     *          responses:
     *              '200':
     *                  description: OK
     *          parameters:
     *              -   name: id
     *                  in: path
     *                  required: true
     */
    router.delete('/:id', (0, utils_1.RequestHandler)(schedulesController.delete));
    return router;
}
exports.SchedulesRouter = SchedulesRouter;
//# sourceMappingURL=schedules.router.js.map