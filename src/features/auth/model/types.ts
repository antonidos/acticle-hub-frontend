export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  token: string | null;
  id: number | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
}

export type RegistrationForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginForm = {
  email: string;
  password: string;
};
