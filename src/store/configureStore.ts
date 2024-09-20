import { configureStore, Middleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import { AuthActionTypes } from './auth/types';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import { SIGN_IN_ROUTER } from '@/routes/constants';

const configStorage: any = {
  key: 'root',
  storage,
  whitelist: ['auth', 'userProfile'],
  debug: false, // to get useful logging
};

const appReducer = (state: any, action: any) => {
  if (action.type === AuthActionTypes.USER_LOGOUT) {
    storage.removeItem('persist:root');
    storage.removeItem('jwt');
    window.location.href = SIGN_IN_ROUTER;
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  return rootReducer(state, action);
};

export type TRootState = ReturnType<typeof rootReducer>;

const loggerMiddleware: Middleware<{}, TRootState> = (store) => (next) => (action) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('store', store.getState());
    console.log('action', action);
  }
  next(action);
};

const appConfigureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const reducers = persistReducer(configStorage, appReducer);
  const store = configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [sagaMiddleware, loggerMiddleware],
  });
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return { store, persistor };
};
export const { store, persistor } = appConfigureStore();
