import { ApiHelper } from '@/utils';

import { IProfile } from './user.interface';
import { IQueryParam, IResponse } from '../common.services';

class UserGroupServiceRoute {
  static readonly USER = 'auth/user';

  static readonly USER_OTP = 'auth/user/opt';

  static readonly USER_PROFILE = 'auth/user/profile';
}

export const getUserProfile = async (query?: IQueryParam[]) => {
  return ApiHelper.get<IResponse<IProfile>>(UserGroupServiceRoute.USER_PROFILE, undefined, query);
};

export const updateUserProfile = async (payload: any) => {
  return ApiHelper.put<IResponse<IProfile>, any>(UserGroupServiceRoute.USER_PROFILE, payload);
};

export const resetPassUserProfile = async (payload: any) => {
  return ApiHelper.put<IResponse<any>, any>(`${UserGroupServiceRoute.USER}/reset-password`, payload);
};

export const otpEmail = async (query?: IQueryParam[]) => {
  return ApiHelper.get<IResponse<any>>(`${UserGroupServiceRoute.USER_OTP}/email`, undefined, query);
};

export const otpPhone = async (query?: IQueryParam[]) => {
  return ApiHelper.get<IResponse<any>>(`${UserGroupServiceRoute.USER_OTP}/phone`, undefined, query);
};

export const otpVerify = async (query?: IQueryParam[]) => {
  return ApiHelper.get<IResponse<any>>(`${UserGroupServiceRoute.USER_OTP}/verify`, undefined, query);
};

export const signature = async (payload?: any) => {
  return ApiHelper.post<IResponse<any>, any>(`${UserGroupServiceRoute.USER}/signature`, payload);
};
