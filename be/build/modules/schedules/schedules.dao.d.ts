import { ISchedule } from './schedules.types';
import { BaseDataAccessObject } from '../../utils/base/base-dao-mongo';
import { IExplorationPayload, IExplorationResponse } from '../../utils';
export declare class SchedulesDao extends BaseDataAccessObject<ISchedule> {
    static readonly INSTANCE_NAME = "schedulesDao";
    static readonly MODEL_NAME = "schedules";
    constructor();
    explore({ query, pagination }: IExplorationPayload): Promise<IExplorationResponse<ISchedule>>;
}
