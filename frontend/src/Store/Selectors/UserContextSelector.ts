import { IAppState } from '..';
import { IUser } from '../../Types';

export const selectUserContext = (): (state: IAppState) => IUser | undefined => (state: IAppState) => state?.userContext?.user;
