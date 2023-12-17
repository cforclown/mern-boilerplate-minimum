import { ISchedule, SchedulesDao } from '.';
import { IExplorationReq, IExplorationRes } from '../../utils';
import { BaseService } from '../../utils/base/base-service';

export class SchedulesService extends BaseService<ISchedule> {
  public static readonly INSTANCE_NAME = 'schedulesService';

  private readonly schedulesDao: SchedulesDao;

  constructor (schedulesDao: SchedulesDao) {
    super(schedulesDao);

    this.schedulesDao = schedulesDao;
  }

  async explore (payload: IExplorationReq): Promise<IExplorationRes<ISchedule>> {
    return this.schedulesDao.explore(payload);
  }
}
