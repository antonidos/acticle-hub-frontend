import { User } from '@features/users/model/types';
import { apiClient } from '@shared/api/baseApi';
import { LoginCredentials, RegisterCredentials } from '../model/types';

export const authApi = {
  register: async (credentials: RegisterCredentials) => {
    return apiClient.post<{ user: User; token: string }>(
      '/api/auth/register',
      credentials
    );
  },

  login: async (credentials: LoginCredentials) => {
    return apiClient.post<{ user: User; token: string }>(
      '/api/auth/login',
      credentials
    );
  },

  logout: async () => {
    return apiClient.post('/api/auth/logout', {});
  },

  // Проверка токена
  verify: async () => {
    return apiClient.post<{ user: User; message: string }>(
      '/api/auth/verify-token',
      {}
    );
  },

  // Обновление токена
  refresh: async () => {
    return apiClient.post('/api/auth/refresh', {});
  },
};
