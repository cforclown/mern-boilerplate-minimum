import { IAccessToken, IReducerAction } from '../../../Types';
import AccessTokenActionTypes from './UserContextActionTypes';

export type IUserContextState = IAccessToken

// export const userContextInitialState = null;
export const userContextInitialState: IUserContextState = {
  accessToken: 'fake-token',
  user: {
    _id: 'haha',
    username: 'haha',
    fullname: 'haha',
    role: {},
  },
  refreshToken: 'fake-refresh-token',
  expiresIn: 3600,
};

// eslint-disable-next-line default-param-last
const Reducer = (state: IUserContextState | null = userContextInitialState, action: IReducerAction): unknown => {
  const { type, params } = action;

  if (type === AccessTokenActionTypes.SET_SESSION) {
    if (!params) {
      return state;
    }
    return { ...params.session };
  }
  if (type === AccessTokenActionTypes.DELETE_SESSION) {
    return null;
  }

  return state;
};

export default Reducer;
