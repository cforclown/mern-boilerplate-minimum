"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulesController = void 0;
const base_controller_1 = require("../../utils/base/base-controller");
class SchedulesController extends base_controller_1.BaseController {
    constructor(schedulesService) {
        super(schedulesService);
        this.schedulesService = schedulesService;
        this.explore = this.explore.bind(this);
    }
    async explore({ body }) {
        return this.schedulesService.explore(body);
    }
}
exports.SchedulesController = SchedulesController;
SchedulesController.INSTANCE_NAME = 'schedulesController';
//# sourceMappingURL=schedules.controller.js.map