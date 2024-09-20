import { createAction } from '@reduxjs/toolkit';

import { TCommon, CommonTypes } from './types';

export const initialCommon: TCommon = {
  error: {
    open: false,
    message: '',
    action: '',
  },
};

export const commonRequestError = createAction<any>(CommonTypes.COMMON_REQUEST_ERROR);
export const commonCloseError = createAction(CommonTypes.COMMON_CLOSE_ERROR);
