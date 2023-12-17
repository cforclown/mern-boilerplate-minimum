import { AuthSwaggerSchemas, SchedulesSwaggerSchemas, UsersSwaggerSchemas } from '../modules';
import { ExplorationSwaggerSchemas, PaginationReqSwaggerSchemas } from '../utils';

const schemas = Object.assign(
  { ...ExplorationSwaggerSchemas },
  { ...PaginationReqSwaggerSchemas },
  { ...AuthSwaggerSchemas },
  { ...UsersSwaggerSchemas },
  { ...SchedulesSwaggerSchemas }
);

export default schemas;
