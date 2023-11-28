import { Request } from 'express';
import { ISchedule } from './schedules.types';
import { BaseController } from '../../utils/base/base-controller';
import { SchedulesService } from './schedules.service';
import { IExplorationResponse } from '../../utils';
export declare class SchedulesController extends BaseController<ISchedule> {
    static readonly INSTANCE_NAME = "schedulesController";
    private readonly schedulesService;
    constructor(schedulesService: SchedulesService);
    explore({ body }: Request): Promise<IExplorationResponse<ISchedule>>;
}
