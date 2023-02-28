import AccessTokenActionTypes from './UserContextActionTypes';

export interface IAccessTokenAction {
  type: string,
  params: Record<string, any> | null,
}
export function SetAccessToken(session: any): IAccessTokenAction {
  return {
    type: AccessTokenActionTypes.SET_SESSION,
    params: { session },
  };
}
export function DeleteAccessToken(): IAccessTokenAction {
  return {
    type: AccessTokenActionTypes.DELETE_SESSION,
    params: null,
  };
}
