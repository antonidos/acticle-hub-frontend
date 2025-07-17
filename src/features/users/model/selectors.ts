import { RootState } from '@shared/config/store';

export const selectUser = (state: RootState) => state.users;
export const selectAllUsers = (state: RootState) => state.users.users;
export const selectUsersLoading = (state: RootState) => state.users.loading;
export const selectUsersError = (state: RootState) => state.users.error;
