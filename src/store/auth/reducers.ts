import { produce } from 'immer';
import { handleActions } from 'redux-actions';

import { AuthActionTypes } from './types';

export interface TAuthState {
  isLoading: boolean;
  logged_in: boolean;
}

const initData: TAuthState = {
  isLoading: false,
  logged_in: false,
};

export const authReducer = handleActions<TAuthState, any>(
  {
    [AuthActionTypes.REQUEST_LOGIN_USER]: (state) =>
      produce(state, (draft) => {
        draft.isLoading = true;
      }),
    [AuthActionTypes.REQUEST_LOGIN_USER_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.logged_in = true;
        draft.isLoading = false;
      }),
    [AuthActionTypes.REQUEST_LOGIN_USER_ERROR]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.logged_in = false;
      }),
    [AuthActionTypes.USER_LOGOUT]: (state) =>
      produce(state, (draft) => {
        draft.logged_in = false;
        draft.isLoading = false;
      }),
    [AuthActionTypes.REMOVE_ERROR_LOGIN]: (state) =>
      produce(state, (draft) => {
        draft.logged_in = false;
        draft.isLoading = false;
      }),
    //
  },
  initData,
);
