import type { RootState } from './index';

// Auth selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

// Articles selectors
export const selectArticles = (state: RootState) => state.articles;
export const selectAllArticles = (state: RootState) => state.articles.articles;
export const selectCurrentArticle = (state: RootState) =>
  state.articles.currentArticle;
export const selectArticlesLoading = (state: RootState) =>
  state.articles.loading;
export const selectArticlesError = (state: RootState) => state.articles.error;

// Users selectors
export const selectUsers = (state: RootState) => state.users;
export const selectAllUsers = (state: RootState) => state.users.users;
export const selectUsersLoading = (state: RootState) => state.users.loading;
export const selectUsersError = (state: RootState) => state.users.error;
