import { Request } from 'express';
import { ISchedule } from '.';
import { BaseController } from '../../utils/base/base-controller';
import { SchedulesService } from './schedules.service';
import { IExplorationRes } from '../../utils';

export class SchedulesController extends BaseController<ISchedule> {
  public static readonly INSTANCE_NAME = 'schedulesController';

  private readonly schedulesService: SchedulesService;

  constructor (schedulesService: SchedulesService) {
    super(schedulesService);
    this.schedulesService = schedulesService;
    this.explore = this.explore.bind(this);
  }

  async explore ({ body }: Request): Promise<IExplorationRes<ISchedule>> {
    return this.schedulesService.explore(body);
  }
}
