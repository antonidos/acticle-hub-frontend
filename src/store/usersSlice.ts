import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UsersState, User } from '../types';

// Моковые данные для разработки
const mockUsers: User[] = [
  {
    id: '1',
    email: 'author@example.com',
    name: 'Автор Статьи',
    avatar: '',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Пользователь',
    avatar: '',
    createdAt: '2024-01-02T00:00:00Z',
  },
];

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

// Асинхронные thunks для API вызовов
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      // Моковая реализация - заменить на реальный API
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockUsers;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка загрузки пользователей'
      );
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (id: string, { rejectWithValue }) => {
    try {
      // Моковая реализация - заменить на реальный API
      await new Promise(resolve => setTimeout(resolve, 500));
      const user = mockUsers.find(user => user.id === id);

      if (!user) {
        throw new Error('Пользователь не найден');
      }

      return user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка загрузки пользователя'
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'users/updateUserProfile',
  async (userData: Partial<User> & { id: string }, { rejectWithValue }) => {
    try {
      // Моковая реализация - заменить на реальный API
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedUser: User = {
        ...mockUsers.find(u => u.id === userData.id)!,
        ...userData,
      };

      return updatedUser;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка обновления профиля'
      );
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch user by ID
      .addCase(fetchUserById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        const existingUserIndex = state.users.findIndex(
          u => u.id === action.payload.id
        );
        if (existingUserIndex !== -1) {
          state.users[existingUserIndex] = action.payload;
        } else {
          state.users.push(action.payload);
        }
        state.error = null;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update user profile
      .addCase(updateUserProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        const userIndex = state.users.findIndex(
          u => u.id === action.payload.id
        );
        if (userIndex !== -1) {
          state.users[userIndex] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, addUser } = usersSlice.actions;
export default usersSlice.reducer;
