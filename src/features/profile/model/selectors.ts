import { RootState } from '@shared/config/store';

export const selectProfileUser = (state: RootState) => state.profile.user;
export const selectProfileLoading = (state: RootState) => state.profile.loading;
export const selectProfileError = (state: RootState) => state.profile.error;
