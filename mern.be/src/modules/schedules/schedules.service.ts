import { ISchedule, SchedulesDao } from '.';
import { IExplorationPayload, IExplorationResponse } from '../../utils';
import { BaseService } from '../../utils/base/base-service';

export class SchedulesService extends BaseService<ISchedule> {
  public static readonly INSTANCE_NAME = 'schedulesService';

  private readonly schedulesDao: SchedulesDao;

  constructor (schedulesDao: SchedulesDao) {
    super(schedulesDao);

    this.schedulesDao = schedulesDao;
  }

  async explore (payload: IExplorationPayload): Promise<IExplorationResponse<ISchedule>> {
    return this.schedulesDao.explore(payload);
  }
}
