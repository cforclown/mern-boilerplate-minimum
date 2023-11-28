"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulesService = void 0;
const base_service_1 = require("../../utils/base/base-service");
class SchedulesService extends base_service_1.BaseService {
    constructor(schedulesDao) {
        super(schedulesDao);
        this.schedulesDao = schedulesDao;
    }
    async explore(payload) {
        return this.schedulesDao.explore(payload);
    }
}
exports.SchedulesService = SchedulesService;
SchedulesService.INSTANCE_NAME = 'schedulesService';
//# sourceMappingURL=schedules.service.js.map