import { callProtectedMainAPI, getAPIEndpoint } from '@/utils/call-api';
import { IExplorationPayload, IExplorationResponse } from '@/utils/exploration/exploration';
import { ISchedule } from './Schedules.metadata';

export const getSchedulesWithPagination = (payload: IExplorationPayload): Promise<IExplorationResponse<ISchedule>> => callProtectedMainAPI(getAPIEndpoint('/schedules/explore', 'POST'), payload);

export const getSchedules = (): Promise<ISchedule[]> => callProtectedMainAPI(getAPIEndpoint('/schedules'));

export const createSchedule = (payload: Omit<ISchedule, 'id'>): Promise<ISchedule> => callProtectedMainAPI(getAPIEndpoint('/schedules', 'POST'), payload);

export const updateSchedule = (payload: ISchedule): Promise<ISchedule> => callProtectedMainAPI(getAPIEndpoint('/schedules', 'PATCH'), payload);

export const deleteSchedule = (id: string): Promise<ISchedule> => callProtectedMainAPI(getAPIEndpoint(`/schedules/${id}`, 'DELETE'));
