import { apiClient } from '@shared/api/baseApi';
import { User } from '@shared/types';

export const usersApi = {
  getUserById: async (id: number) => {
    return apiClient.get<{ user: User }>(`/api/users/${id}`);
  },
};
