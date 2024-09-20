import { ApiHelper } from '@/utils';

import { IResponse } from '../common.services';
import { IParamLogin, IParamRegister, IResponseAuth } from './auth.interface';

class AuthServiceRoute {
  static readonly LOGIN_AUTH = '/auth/login';

  static readonly REGISTER_AUTH = '/auth/register';

  static readonly REFRESH_TOKEN_AUTH = '/auth/refresh-token';
}

export const loginAuth = async (params: IParamLogin) => {
  return ApiHelper.post<IResponseAuth, IParamLogin>(AuthServiceRoute.LOGIN_AUTH, params);
};

export const registerAuth = async (params: IParamRegister) => {
  return ApiHelper.post<any, IParamRegister>(AuthServiceRoute.REGISTER_AUTH, params);
};

export const refreshTokenAuth = async (refreshToken: string) => {
  const bodyRequest = { refreshToken };
  return ApiHelper.post<IResponse<any>, typeof bodyRequest>(AuthServiceRoute.REFRESH_TOKEN_AUTH, bodyRequest);
};

export const logout = async () => {
  window.localStorage.clear();
};
