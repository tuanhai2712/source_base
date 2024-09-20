import { createAction } from '@reduxjs/toolkit';

import { UserActionTypes } from './types';
import { IProfile } from '@/services/user';

const initProfileState: IProfile = {
  id: '',
  fullName: '',
  userName: '',
  email: '',
  phonenumber: '',
  isSuperAdmin: false,
  permissions: [],
};

export const initProfileFullState = {
  profile: initProfileState,
  is_loading: false,
  error: null,
};

export const requestUserProfile = createAction(UserActionTypes.REQUEST_USER_PROFILE);

export const requestUserProfileSuccess = createAction(UserActionTypes.REQUEST_USER_PROFILE_SUCCESS);

export const requestUserProfileError = createAction(UserActionTypes.REQUEST_USER_PROFILE_ERROR);

export const emailUserForgotPassword = createAction(UserActionTypes.EMAIL_USER_FORGOT_PASSWORD);

export const updateProdile = createAction(UserActionTypes.UPDATE_PROFILE);

export type TUserProfileFullState = {
  profile: IProfile;
  is_loading: boolean;
  error: null;
};
