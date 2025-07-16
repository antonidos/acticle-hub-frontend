import { RootState } from '@shared/config/store';

export const selectArticles = (state: RootState) => state.articles;
export const selectAllArticles = (state: RootState) => state.articles.articles;
export const selectCurrentArticle = (state: RootState) =>
  state.articles.currentArticle;
export const selectArticlesLoading = (state: RootState) =>
  state.articles.loading;
export const selectArticlesError = (state: RootState) => state.articles.error;
