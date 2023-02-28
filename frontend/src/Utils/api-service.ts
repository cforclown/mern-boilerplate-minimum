/* eslint-disable brace-style */
import axios, { AxiosResponse } from 'axios';
import store, { IAppState } from '../Store';
import { SetAccessToken } from '../Store/Reducers/UserContext/UserContextActions';

export enum HTTPStatusCodes {
  Ok = 200,
  BadRequest = 400,
  NotFound = 404,
  Unauthorized = 401,
  Forbidden = 403,
  Internal = 500,
  BadGateway = 502,
  ServiceUnavailable = 503,
}

export class RestAPIException extends Error {
  status: number;

  headers?: any;

  constructor(message: string, status = HTTPStatusCodes.BadRequest, headers = undefined) {
    super(message);
    this.status = status;
    this.headers = headers;
  }
}

export type IAPIEndpointMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface IAPIEndpoint {
  url: string;
  method?: IAPIEndpointMethod;
  headers?: Record<string, any>;
}

export const HOMEPAGE_URL = process.env.REACT_APP_HOMEPAGE;
export const MAIN_REST_API_BASE_ENDPOINT = process.env.REACT_APP_REST_API_BASE_URL;
export const MAIN_REST_API_AUTH_ENDPOINT = `${MAIN_REST_API_BASE_ENDPOINT}/auth`;

export const getAuthEndpoint = (
  authPath: '/login' | '/register' | '/refresh-token',
  method?: IAPIEndpointMethod,
  header?: Record<string, any>,
): IAPIEndpoint => ({
  url: MAIN_REST_API_AUTH_ENDPOINT + authPath,
  method,
  headers: header,
});

export const REST_API_API_ENDPOINT = `${MAIN_REST_API_BASE_ENDPOINT}/api`;

export const getMainAPIEndpoint = (path: string, method?: IAPIEndpointMethod, header?: Record<string, any>): IAPIEndpoint => ({
  url: REST_API_API_ENDPOINT + path,
  method,
  headers: header,
});

export const getAxiosMethod = (endpoint: IAPIEndpoint, body: any): Promise<AxiosResponse<any, any>> => {
  let callback;
  switch (endpoint.method) {
    case 'GET':
      callback = axios.get(endpoint.url);
      break;
    case 'POST':
      callback = axios.post(endpoint.url, body);
      break;
    case 'PUT':
      callback = axios.put(endpoint.url, body);
      break;
    case 'PATCH':
      callback = axios.patch(endpoint.url, body);
      break;
    case 'DELETE':
      callback = axios.delete(endpoint.url);
      break;
    default:
      callback = axios.get(endpoint.url);
      break;
  }
  return callback;
};

export interface ICallApiResponse {
  data: any;
  error?: RestAPIException;
}

// there will be multiple api fetch handler
export const axiosFetchHandler = async (endpoint: IAPIEndpoint, body?: any): Promise<any> => {
  try {
    const response = await getAxiosMethod(endpoint, body);
    return response.data;
  } catch (err: any) {
    // Request made and server responded
    if (err.response) {
      const { error } = err.response.data;
      throw new RestAPIException(error, err.response.status, err.response.headers);
    }
    // The request was made but no response was received
    else if (err.request) {
      throw new RestAPIException('Server is not responding', HTTPStatusCodes.BadGateway);
    }
    // Something happened in setting up the request that triggered an Error
    throw err;
  }
};

export const callApi = async (endpoint: IAPIEndpoint, body?: any, fetchHandler?: (endpoint: IAPIEndpoint, body?: any) => Promise<any>): Promise<ICallApiResponse> => {
  let data; let error;
  try {
    data = fetchHandler ? await fetchHandler(endpoint, body) : await axiosFetchHandler(endpoint, body);
  } catch (err: any) {
    error = err;
  }

  return { data, error };
};

export const callMainAPI = async <T>(endpoint: IAPIEndpoint, body?: any, autoRefreshAccessToken = true): Promise<T> => {
  const accessToken = (store.getState() as IAppState).userContext?.accessToken;
  const refreshToken = (store.getState() as IAppState).userContext?.refreshToken;
  if (!accessToken) {
    throw new RestAPIException('User is not logged in', HTTPStatusCodes.Unauthorized);
  }
  // eslint-disable-next-line no-param-reassign
  endpoint.headers = Object.assign(endpoint.headers ?? {}, {
    Authorization: `Bearer ${accessToken}`,
  });

  const { data: responseBody, error } = await callApi(endpoint, body);
  if (error) {
    if (error.status === HTTPStatusCodes.Unauthorized && autoRefreshAccessToken && refreshToken) {
      const refreshTokenResponse = await callApi(getAuthEndpoint('/refresh-token', 'POST'), { refreshToken });
      if (refreshTokenResponse.error) {
        throw new RestAPIException('User is not logged in', HTTPStatusCodes.Unauthorized);
      }
      store.dispatch(SetAccessToken(refreshTokenResponse.data));
      return callMainAPI(endpoint, body, false);
    }

    throw error;
  } else if (responseBody.error) {
    throw new RestAPIException('User is not logged in', HTTPStatusCodes.Unauthorized);
  }

  return responseBody.data;
};
