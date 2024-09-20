import { produce } from 'immer';
import { handleActions } from 'redux-actions';

import { initialCommon } from './actions';
import { TCommon, CommonTypes } from './types';

export const commonReducer = handleActions<TCommon, any>(
  {
    [CommonTypes.COMMON_REQUEST_ERROR]: (state, action) =>
      produce(state, (draft) => {
        draft.error.open = true;
        draft.error.message = action.payload.message;
        draft.error.action = action.payload.action;
        draft.error.timeout = action.payload.timeout;
        draft.error.description = action.payload.description;
      }),
    [CommonTypes.COMMON_CLOSE_ERROR]: (state) =>
      produce(state, (draft) => {
        draft.error.open = false;
        draft.error.message = '';
        draft.error.action = '';
        draft.error.description = '';
      }),
  },
  initialCommon,
);
