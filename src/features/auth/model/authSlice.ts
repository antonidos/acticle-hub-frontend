import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import { apiClient } from '@shared/api/baseApi';
import { AuthState, LoginCredentials, RegisterCredentials } from './types';
import { ApiError } from '@shared/api/baseApi';

const initialState: AuthState = {
  token: null,
  id: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isInitialized: false,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);

      const { id, token } = response;

      if (token) {
        apiClient.setAuthToken(token);
        localStorage.setItem('token', token);
      }

      return { id, token };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка авторизации'
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await authApi.register(credentials);

      const { id, token } = response;

      if (token) {
        apiClient.setAuthToken(token);
        localStorage.setItem('token', token);
      }

      return { id, token };
    } catch (error) {
      if (error instanceof ApiError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка регистрации'
      );
    }
  }
);

export const verifyToken = createAsyncThunk(
  'auth/verify-token',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.verify();

      return response;
    } catch (error) {
      apiClient.clearAuthToken();
      localStorage.removeItem('token');

      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка проверки токена'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    restoreAuth: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isInitialized = true;
      apiClient.setAuthToken(action.payload.token);
    },
    logout: state => {
      state.token = null;
      state.id = null;
      state.isAuthenticated = false;
      state.isInitialized = true;
      apiClient.clearAuthToken();
      localStorage.removeItem('token');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
        state.isInitialized = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.id = action.payload.id;
        state.isAuthenticated = true;
        state.error = null;
        state.isInitialized = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.isInitialized = true;
      })
      // Register
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token || null;
        state.id = action.payload.id;
        state.isAuthenticated = true;
        state.error = null;
        state.isInitialized = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.isInitialized = true;
      })
      // Verify token
      .addCase(verifyToken.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload.userId;
        state.isAuthenticated = true;
        state.error = null;
        state.isInitialized = true;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.isInitialized = true;
      });
  },
});

export const { clearError, restoreAuth, logout } = authSlice.actions;
export default authSlice.reducer;
