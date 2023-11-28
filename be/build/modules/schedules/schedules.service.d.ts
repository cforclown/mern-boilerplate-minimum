import { ISchedule, SchedulesDao } from '.';
import { IExplorationPayload, IExplorationResponse } from '../../utils';
import { BaseService } from '../../utils/base/base-service';
export declare class SchedulesService extends BaseService<ISchedule> {
    static readonly INSTANCE_NAME = "schedulesService";
    private readonly schedulesDao;
    constructor(schedulesDao: SchedulesDao);
    explore(payload: IExplorationPayload): Promise<IExplorationResponse<ISchedule>>;
}
