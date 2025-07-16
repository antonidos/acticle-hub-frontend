import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { ArticlesState, Article, CreateArticleData, User } from '../types';

const mockAuthor: User = {
  id: '1',
  email: 'author@example.com',
  username: 'Автор Статьи',
  avatarUrl: '',
  createdAt: '2024-01-01T00:00:00Z',
};

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Введение в React',
    content: 'Подробное руководство по React...',
    author: mockAuthor,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    likes: 12,
    isLiked: false,
  },
  {
    id: '2',
    title: 'Redux Toolkit Guide',
    content: 'Как использовать Redux Toolkit...',
    author: mockAuthor,
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T14:30:00Z',
    likes: 8,
    isLiked: true,
  },
];

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
      // Моковая реализация - заменить на реальный API
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockArticles;
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
      await new Promise(resolve => setTimeout(resolve, 500));
      const article = mockArticles.find(article => article.id === id);

      if (!article) {
        throw new Error('Статья не найдена');
      }

      return article;
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
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newArticle: Article = {
        id: Date.now().toString(),
        title: articleData.title,
        content: articleData.content,
        author: mockAuthor,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likes: 0,
        isLiked: false,
      };

      return newArticle;
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
      })
      // Toggle like
      .addCase(toggleLike.fulfilled, (state, action) => {
        const articleId = action.payload;
        const article = state.articles.find(a => a.id === articleId);
        if (article) {
          article.isLiked = !article.isLiked;
          article.likes += article.isLiked ? 1 : -1;
        }
        if (state.currentArticle && state.currentArticle.id === articleId) {
          state.currentArticle.isLiked = !state.currentArticle.isLiked;
          state.currentArticle.likes += state.currentArticle.isLiked ? 1 : -1;
        }
      });
  },
});

export const { clearCurrentArticle, clearError } = articlesSlice.actions;
export default articlesSlice.reducer;
