export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  createdAt?: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  likes: number;
  isLiked: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
}

export interface ArticlesState {
  articles: Article[];
  currentArticle: Article | null;
  loading: boolean;
  error: string | null;
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface CreateArticleData {
  title: string;
  description: string;
  content: string;
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

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ApiErrorResponse {
  message: string;
  status: number;
}
