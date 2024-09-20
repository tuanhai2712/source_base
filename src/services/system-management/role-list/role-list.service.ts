import { ApiHelper } from '@/utils';

import { IListResponse, IQueryParam, IResponse } from '../../common.services';
import { IParamRole, IRoleDetails, IRoleList } from './role-list.interface';
class Route {
  static readonly ROLE = '/auth/role';

  static readonly ROLE_PERMISION = Route.ROLE + '/permision-list';
}

export const getRoleList = async (query?: IQueryParam[]) => {
  return ApiHelper.get<IListResponse<IRoleList>>(Route.ROLE, undefined, query);
};

export const getRoleById = async (params: { id: string }) => {
  return ApiHelper.get<IResponse<IRoleDetails>>(`${Route.ROLE}/?id=${params.id}`);
};

export const createRole = async (payload?: IParamRole) => {
  return ApiHelper.post<IResponse<any>, any>(Route.ROLE, payload);
};

export const updateRole = async (payload?: IParamRole) => {
  return ApiHelper.put<IResponse<any>, any>(Route.ROLE, payload);
};

export const deleteRole = async (params: { id: string }) => {
  return ApiHelper.delete<IResponse<any>, any>(`${Route.ROLE}/?id=${params.id}`);
};

export const getMyRoleList = async (params: { id: string }) => {
  return ApiHelper.get<IResponse<IRoleDetails>>(`${Route.ROLE}/?id=${params.id}`);
};
