import { call, put } from 'redux-saga/effects';

import { getUserProfile } from '../../services/user';
import { requestUserProfileError, requestUserProfileSuccess } from './actions';

export function* fetchProfileUser(): any {
  const payloadUserProfile = yield call(getUserProfile);
  if (payloadUserProfile.success) {
    const roleUser = window.localStorage.getItem('role');
    if (!roleUser) {
      window.localStorage.setItem('role', payloadUserProfile.data?.role);
    }

    yield put(requestUserProfileSuccess(payloadUserProfile.data));
  } else {
    yield put(requestUserProfileError(payloadUserProfile));
  }
}

export const userProfile = () => {
  const roleUser = window.localStorage.getItem('role');
  return roleUser;
};
