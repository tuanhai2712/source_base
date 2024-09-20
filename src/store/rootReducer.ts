import { combineReducers } from 'redux';

import { authReducer } from './auth/reducers';
import { commonReducer } from './common/reducers';
import { userProfileReducer } from './user/reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  userProfile: userProfileReducer,
  common: commonReducer,
});
export default rootReducer;
