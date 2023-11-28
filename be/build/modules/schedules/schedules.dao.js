"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulesDao = void 0;
const base_dao_mongo_1 = require("../../utils/base/base-dao-mongo");
const mongoose_1 = require("mongoose");
class SchedulesDao extends base_dao_mongo_1.BaseDataAccessObject {
    constructor() {
        super((0, mongoose_1.model)(SchedulesDao.MODEL_NAME));
    }
    async explore({ query, pagination }) {
        const result = await this.model
            .aggregate([
            {
                $match: {
                    $or: [
                        { name: { $regex: query ?? '', $options: 'i' } },
                        { start: { $regex: query ?? '', $options: 'i' } },
                        { end: { $regex: query ?? '', $options: 'i' } },
                        { desc: { $regex: query ?? '', $options: 'i' } }
                    ]
                }
            },
            {
                $sort: {
                    [pagination.sort.by]: pagination.sort.order
                }
            },
            {
                $addFields: {
                    id: '$_id'
                }
            },
            {
                $facet: {
                    metadata: [
                        { $count: 'total' },
                        { $addFields: { page: pagination.page } }
                    ],
                    data: [
                        { $skip: (pagination.page - 1) * pagination.limit },
                        { $limit: pagination.limit }
                    ]
                }
            }
        ])
            .exec();
        const response = {
            data: [],
            exploration: {
                query,
                pagination: {
                    ...pagination,
                    pageCount: 0
                }
            }
        };
        if (result[0].metadata.length && result[0].data.length) {
            response.data = result[0].data;
            response.exploration.pagination.pageCount = Math.ceil(result[0].metadata[0].total / pagination.limit);
        }
        return response;
    }
}
exports.SchedulesDao = SchedulesDao;
SchedulesDao.INSTANCE_NAME = 'schedulesDao';
SchedulesDao.MODEL_NAME = 'schedules';
//# sourceMappingURL=schedules.dao.js.map