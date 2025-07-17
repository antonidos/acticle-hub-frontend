import { apiClient } from '@shared/api/baseApi';
import { LoginCredentials, RegisterCredentials } from '../model/types';

export const authApi = {
  register: async (credentials: RegisterCredentials) => {
    return apiClient.post<{ id: number; token: string }>(
      '/api/auth/register',
      credentials
    );
  },

  login: async (credentials: LoginCredentials) => {
    return apiClient.post<{ id: number; token: string }>(
      '/api/auth/login',
      credentials
    );
  },

  logout: async () => {
    return apiClient.post('/api/auth/logout', {});
  },

  // Проверка токена
  verify: async () => {
    return apiClient.post<{ userId: number; message: string }>(
      '/api/auth/verify-token',
      {}
    );
  },

  // Обновление токена
  refresh: async () => {
    return apiClient.post('/api/auth/refresh', {});
  },
};
