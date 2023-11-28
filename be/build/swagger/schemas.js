"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = require("../modules");
const utils_1 = require("../utils");
const schemas = Object.assign({ ...utils_1.ExplorationSwaggerSchemas }, { ...utils_1.PaginationPayloadSwaggerSchemas }, { ...modules_1.AuthSwaggerSchemas }, { ...modules_1.UsersSwaggerSchemas }, { ...modules_1.SchedulesSwaggerSchemas });
exports.default = schemas;
//# sourceMappingURL=schemas.js.map