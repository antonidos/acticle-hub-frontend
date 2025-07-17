import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileState } from './types';
import { User } from '@shared/types';
import { profileApi } from '../api/profileApi';

const initialState: ProfileState = {
  user: null,
  loading: false,
  error: null,
};

export const fetchMe = createAsyncThunk(
  'profile/fetchMe',
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileApi.getUserById();
      return response.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  'profile/updateUser',
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await profileApi.updateUser(user);
      return response.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addAvatar = createAsyncThunk(
  'profile/addAvatar',
  async (avatar: File, { rejectWithValue }) => {
    try {
      const response = await profileApi.addAvatar(avatar);
      return response.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteAvatar = createAsyncThunk(
  'profile/deleteAvatar',
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileApi.deleteAvatar();
      return response.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = null;
    },
  },
  extraReducers: builder => {
    // fetchUserById
    builder.addCase(fetchMe.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchMe.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // updateUser
    builder.addCase(updateUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // addAvatar
    builder.addCase(addAvatar.pending, state => {
      state.loading = true;
    });
    builder.addCase(addAvatar.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(addAvatar.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // deleteAvatar
    builder.addCase(deleteAvatar.pending, state => {
      state.loading = true;
    });
    builder.addCase(deleteAvatar.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteAvatar.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setUser, clearUser } = profileSlice.actions;
export default profileSlice.reducer;
