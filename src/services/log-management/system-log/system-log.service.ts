import { ApiHelper } from '@/utils';

import { IListResponse, IQueryParam, IResponse } from '../../common.services';
import { ISystemLog } from './system-log.interface';
class Route {
  static readonly SYSTEM_LOG = '/auth/systemlog';
}

export const getSystemLogList = async (query?: IQueryParam[]) => {
  return ApiHelper.get<IListResponse<ISystemLog>>(`${Route.SYSTEM_LOG}/list`, undefined, query);
};

export const getSystemLogById = async (params: { id: string }) => {
  return ApiHelper.get<IResponse<ISystemLog>>(`${Route.SYSTEM_LOG}/?id=${params.id}`);
};
