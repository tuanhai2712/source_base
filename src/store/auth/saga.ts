import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { IParamLogin, loginAuth, logout } from '@/services/auth';
import { getUserProfile, IResponseLogin } from '@/services/user';

import history from '../history';
import { fetchProfileUser } from '../user/saga';
import { UserActionTypes } from '../user/types';
import { userLoginRequestError, userLoginRequestSuccess } from './actions';
import { AuthActionTypes } from './types';
import { DASHBOARD_ROUTER } from '@/routes/constants';
import { requestUserProfileSuccess } from '../user/actions';
interface IActionLoginSuccess {
  type: string;
  payload: IResponseLogin;
}

interface IAction {
  type: string;
  payload: IParamLogin | string;
}

function forwardTo(location: string) {
  history.push(location);
}

function* loginNormal(action: IAction): any {
  try {
    const payloadParam = action.payload as IParamLogin;
    const payload = yield call(async () => loginAuth(payloadParam));
    if (payload.accessToken) {
      yield put(userLoginRequestSuccess(payload));
    } else {
      yield put(userLoginRequestError());
    }
  } catch (error: any) {}
}

function* processingUserLoginSuccess(action: IActionLoginSuccess): any {
  const currentUser = action.payload;
  window.localStorage.setItem('jwt', currentUser?.accessToken ?? '');
  window.localStorage.setItem('refresh_token', currentUser?.refreshToken ?? '');
  let redirectPage = DASHBOARD_ROUTER;
  const payloadUserProfile = yield call(getUserProfile);
  let rd: any = new URLSearchParams(window.location.search).get('rd');
  if (payloadUserProfile.statusCode === 200) {
    const roleUser = yield window.localStorage.getItem('role');
    yield put(requestUserProfileSuccess(payloadUserProfile.data));
    if (!roleUser) {
      yield window.localStorage.setItem('role', payloadUserProfile.data?.role);
    }
  }

  yield call(forwardTo, rd ?? redirectPage);
}

function* doLogout() {
  try {
    yield call(async () => logout());
    yield put({ type: AuthActionTypes.USER_LOGOUT });
  } catch (e) {
    console.log('Error logging out', e);
  }
}

export const authSagas = [
  takeEvery(UserActionTypes.REQUEST_USER_PROFILE, fetchProfileUser),
  takeLatest(AuthActionTypes.REQUEST_LOGIN_USER, loginNormal),
  takeEvery(AuthActionTypes.REQUEST_LOGIN_USER_SUCCESS, processingUserLoginSuccess),
  takeEvery(AuthActionTypes.REQUEST_USER_LOGOUT, doLogout),
];
