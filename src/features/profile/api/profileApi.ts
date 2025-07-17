import { apiClient } from '@shared/api/baseApi';
import { User } from '@shared/types';

export const profileApi = {
  getUserById: async () => {
    return apiClient.get<{ user: User }>(`/api/profile`);
  },

  updateUser: async ({
    username,
    email,
  }: {
    username: string;
    email: string;
  }) => {
    return apiClient.put<{ user: User }>(`/api/profile`, { username, email });
  },

  addAvatar: async (avatar: File) => {
    const formData = new FormData();
    formData.append('avatar', avatar);
    return apiClient.post<{ user: User }>(`/api/profile/avatar`, formData);
  },

  deleteAvatar: async () => {
    return apiClient.delete<{ user: User }>(`/api/profile/avatar`);
  },
};
