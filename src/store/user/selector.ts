import { IProfile } from '@/services/user';
import { TRootState } from '../index';

export const userProfileState = (state: TRootState): IProfile => state.userProfile.profile;
export const userProfileError = (state: TRootState): any => state.userProfile.error;
