export interface IQueryParam {
  key: any;
  value: any;
}
export const apiRouteGenerator = (route: string, idParam?: number, query?: IQueryParam[]) => {
  let url = route;
  if (idParam) {
    url = `${url}/${idParam}`;
  }
  if (query && query.length > 0) {
    const searchParams = new URLSearchParams();
    for (const item of query) {
      if (item.value) {
        searchParams.append(item.key, item.value as string);
      }
    }
    return `${url}?${searchParams.toString()}`;
  }
  return url;
};

export interface IListResponse<T> {
  data: T[];
  error?: any;
  message?: string;
  statusCode: number;
  paging: {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}

export interface IResponse<T> {
  data: T;
  error?: any;
  message?: string;
  success: boolean;
  errorCode?: string;
  statusCode?: number;
}
export interface IListResponseItem<T> {
  data: T[];
  error?: any;
  message?: string;
  success: boolean;
}

export interface IDataChart {
  time: number;
  value: number;
}

export interface IListResponseObj<T> {
  data: T;
  error?: any;
  message?: string;
  success: boolean;
}
