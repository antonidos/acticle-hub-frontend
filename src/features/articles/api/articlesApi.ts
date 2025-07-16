import { apiClient } from '@shared/api/baseApi';
import {
  Article,
  CreateArticleData,
  PaginationParams,
  PaginationResponse,
} from '../model/types';

export const articlesApi = {
  getArticles: async (params?: PaginationParams) => {
    return apiClient.get<{
      articles: Article[];
      pagination: PaginationResponse;
    }>('/api/articles', params as Record<string, number>);
  },

  getArticleById: async (id: string) => {
    return apiClient.get<{ article: Article }>(`/api/articles/${id}`);
  },

  createArticle: async (article: CreateArticleData) => {
    return apiClient.post<{ article: Article; message: string }>(
      '/api/articles',
      article
    );
  },

  updateArticle: async (id: string, article: CreateArticleData) => {
    return apiClient.put<Article>(`/api/articles/${id}`, article);
  },

  deleteArticle: async (id: string) => {
    return apiClient.delete<Article>(`/api/articles/${id}`);
  },
};
