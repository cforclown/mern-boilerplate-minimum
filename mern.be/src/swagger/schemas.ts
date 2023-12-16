import { AuthSwaggerSchemas, SchedulesSwaggerSchemas, UsersSwaggerSchemas } from '../modules';
import { ExplorationSwaggerSchemas, PaginationPayloadSwaggerSchemas } from '../utils';

const schemas = Object.assign(
  { ...ExplorationSwaggerSchemas },
  { ...PaginationPayloadSwaggerSchemas },
  { ...AuthSwaggerSchemas },
  { ...UsersSwaggerSchemas },
  { ...SchedulesSwaggerSchemas }
);

export default schemas;
