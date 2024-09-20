/* eslint-disable */
import { errorCode } from '@/constants';
import axios from '../commons/axios';
import httpStatus from '../commons/httpStatus';
import { apiRouteGenerator } from '../services/common.services';
import { store } from '../store';
import { AuthActionTypes } from '../store/auth/types';
import { commonRequestError } from '../store/common/actions';
import { message } from 'antd';

interface IQueryParam {
  key: string;
  value: string | number;
}
class HttpClientHelper {
  async get<T>(path: string, idParam?: number, query?: IQueryParam[], headerConfig?: any) {
    try {
      const endpoint = apiRouteGenerator(path, idParam, query);
      const response = await axios.get<T>(endpoint, headerConfig);
      return response.data;
    } catch (ex) {
      handleError(ex);
      return {} as T;
    }
  }

  async post<T, U>(path: string, payload?: U, idParam?: number, headerConfig?: any) {
    try {
      const endpoint = apiRouteGenerator(path, idParam);
      const { data } = await axios.post<T>(endpoint, payload, headerConfig);
      return data;
    } catch (ex) {
      handleError(ex);
      return {} as T;
    }
  }

  async put<T, U>(path: string, payload: U, idParam?: number) {
    try {
      const endpoint = idParam ? apiRouteGenerator(path, idParam) : apiRouteGenerator(path);
      const { data } = await axios.put<T>(endpoint, payload);
      return data;
    } catch (ex) {
      handleError(ex);
      return {} as T;
    }
  }

  async patch<T, U>(path: string, payload: U, idParam?: number) {
    try {
      const endpoint = apiRouteGenerator(path, idParam);
      const { data } = await axios.patch<T>(endpoint, payload);
      return data;
    } catch (ex) {
      handleError(ex);
      return {} as T;
    }
  }

  async delete<T, U = {}>(path: string, payload?: U, idParam?: number) {
    try {
      const endpoint = apiRouteGenerator(path, idParam);
      const { data } = await axios.delete<T>(endpoint, { data: payload });
      return data;
    } catch (ex) {
      handleError(ex);
      return {} as T;
    }
  }

  async upload<T, U>(path: string, data?: U) {
    try {
      const endpoint = apiRouteGenerator(path);
      const result = await axios.put(
        endpoint,
        { ...data },
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        },
      );
      return result.data;
    } catch (ex) {
      handleError(ex);
      return {} as T;
    }
  }
}

function handleError(error: any) {
  message.config({
    duration: 2,
    maxCount: 3,
  });
  const msg = error && error.data ? error.data.message : 'Cannot connect server.';
  if (error && error.status === httpStatus.StatusNotFound) return;
  if (error && error.status === httpStatus.StatusBadRequest)
    return message.open({
      type: 'error',
      content: msg,
    });
  const timeout = httpStatus.StatusUnauthorized ? 2000 : null;
  store.dispatch(commonRequestError({ message: msg, action: '', timeout }));
}

export const ApiHelper = new HttpClientHelper();
