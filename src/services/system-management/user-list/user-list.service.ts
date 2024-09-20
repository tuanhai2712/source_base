import { ApiHelper } from '@/utils';

import { IListResponse, IQueryParam, IResponse } from '../../common.services';
import { IUserList } from './user-list.interface';
class Route {
  static readonly USER_STATISTIC = '/auth/users/statistical-user';

  static readonly USER = '/auth/user';

  static readonly USER_LIST = '/auth/user/list';

  static readonly USER_RESET_PASSWORD = '/auth/user/reset-password';

  static readonly UPDATE_USER_STATUS = '/auth/users/change-status';
}

export const getUserList = async (query?: IQueryParam[]) => {
  return ApiHelper.get<IListResponse<IUserList>>(Route.USER_LIST, undefined, query);
};

export const getUserById = async (params: { id: string }) => {
  return ApiHelper.get<IResponse<IUserList>>(`${Route.USER}/?id=${params.id}`);
};

export const createUser = async (payload?: any) => {
  return ApiHelper.post<IResponse<any>, any>(Route.USER, payload);
};

export const updateUser = async (payload?: any) => {
  return ApiHelper.put<IResponse<any>, any>(Route.USER, payload);
};

export const deleteUser = async (params: { id: string }) => {
  return ApiHelper.delete<IResponse<any>, any>(`${Route.USER}/?id=${params.id}`);
};

export const activeUser = async (payload: { id: string }) => {
  return ApiHelper.put<IResponse<IUserList>, any>(`${Route.USER}/active`, payload);
};

export const registerRolesUser = async (payload: any) => {
  return ApiHelper.post<IResponse<any>, any>(`${Route.USER}/add-user-roles`, payload);
};

export const updateRolesUser = async (payload?: any) => {
  return ApiHelper.put<IResponse<any>, any>(`${Route.USER}/update-user-roles`, payload);
};

export const removeRolesUser = async (payload: any) => {
  return ApiHelper.delete<IResponse<any>, any>(`${Route.USER}/delete-user-roles`, payload);
};

export const exportExcel = async (query?: IQueryParam[]) => {
  return ApiHelper.get<IListResponse<any>>(`${Route.USER}/export-excel`, undefined, query, {
    responseType: 'blob',
  });
};

export const exportPdf = async (query?: IQueryParam[]) => {
  return ApiHelper.get<IListResponse<any>>(`${Route.USER}/export-pdf`, undefined, query, {
    responseType: 'blob',
  });
};

export const lockUser = async (payload: { id: string }) => {
  return ApiHelper.put<IResponse<IUserList>, any>(`${Route.USER}/lock`, payload);
};

export const resetPassUserByAdmin = async (payload: any) => {
  return ApiHelper.put<IResponse<any>, any>(`${Route.USER}/reset-password-by-admin`, payload);
};
