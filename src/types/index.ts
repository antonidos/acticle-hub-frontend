// Типы для пользователя
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

// Типы для статьи
export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  likes: number;
  isLiked: boolean;
}

// Типы для аутентификации
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Типы для статей
export interface ArticlesState {
  articles: Article[];
  currentArticle: Article | null;
  loading: boolean;
  error: string | null;
}

// Типы для пользователей
export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

// Типы для форм
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CreateArticleData {
  title: string;
  description: string;
  content: string;
}

// Типы для API ответов
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
}
