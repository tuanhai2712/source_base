import { createAction } from '@reduxjs/toolkit';

import { IParamLogin } from '@/services/auth';

import { AuthActionTypes } from './types';

export const requestUserLogin = createAction<IParamLogin>(AuthActionTypes.REQUEST_LOGIN_USER);
export const userLoginRequestSuccess = createAction(AuthActionTypes.REQUEST_LOGIN_USER_SUCCESS);
export const userLoginRequestError = createAction(AuthActionTypes.REQUEST_LOGIN_USER_ERROR);
export const UserLogout = createAction(AuthActionTypes.REQUEST_USER_LOGOUT);
export const RemoveErrorLogin = createAction(AuthActionTypes.REMOVE_ERROR_LOGIN);
