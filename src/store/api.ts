import { LoginCredentials, RegisterCredentials, User } from '../types';

const API_BASE_URL = '';

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  constructor(baseURL: string) {
    this.baseURL = baseURL;

    if (localStorage.getItem('token')) {
      this.setAuthToken(localStorage.getItem('token') || '');
    }
  }

  // Устанавливает заголовки для всех запросов
  setHeaders(headers: Record<string, string>): void {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }

  // Устанавливает токен авторизации
  setAuthToken(token: string): void {
    this.defaultHeaders.Authorization = `Bearer ${token}`;
  }

  // Удаляет заголовки
  removeHeaders(keys: string[]): void {
    keys.forEach(key => {
      delete this.defaultHeaders[key];
    });
  }

  // Очищает токен авторизации
  clearAuthToken(): void {
    delete this.defaultHeaders.Authorization;
  }

  // Очищает все заголовки
  clearHeaders(): void {
    this.defaultHeaders = {};
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        ...this.defaultHeaders,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError({
          message: errorData.message || `HTTP Error: ${response.status}`,
          status: response.status,
        });
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError({
        message: error instanceof Error ? error.message : 'Ошибка сети',
        status: 0,
      });
    }
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

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

class ApiError extends Error {
  status: number;

  constructor({ message, status }: { message: string; status: number }) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export { ApiError };
