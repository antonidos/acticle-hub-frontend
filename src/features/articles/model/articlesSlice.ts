import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { articlesApi } from '../api/articlesApi';
import { ArticlesState, CreateArticleData } from './types';

const initialState: ArticlesState = {
  articles: [],
  currentArticle: null,
  loading: false,
  error: null,
};

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await articlesApi.getArticles();
      return response.articles;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка загрузки статей'
      );
    }
  }
);

export const fetchArticleById = createAsyncThunk(
  'articles/fetchArticleById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await articlesApi.getArticleById(id);

      return response.article;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка загрузки статьи'
      );
    }
  }
);

export const createArticle = createAsyncThunk(
  'articles/createArticle',
  async (articleData: CreateArticleData, { rejectWithValue }) => {
    try {
      const response = await articlesApi.createArticle(articleData);

      return response.article;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка создания статьи'
      );
    }
  }
);

export const toggleLike = createAsyncThunk(
  'articles/toggleLike',
  async (articleId: string, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return articleId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка обновления лайка'
      );
    }
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    clearCurrentArticle: state => {
      state.currentArticle = null;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch articles
      .addCase(fetchArticles.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
        state.error = null;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch article by ID
      .addCase(fetchArticleById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentArticle = action.payload;
        state.error = null;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create article
      .addCase(createArticle.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.articles.unshift(action.payload);
        state.error = null;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentArticle, clearError } = articlesSlice.actions;
export default articlesSlice.reducer;
