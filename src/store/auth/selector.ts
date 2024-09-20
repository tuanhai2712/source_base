import { TAuthState } from './reducers';
import { TRootState } from '../index';

export const IsLoggedIn = (state: TRootState): boolean => state.auth.logged_in;
export const AuthState = (state: TRootState): TAuthState => state.auth;
