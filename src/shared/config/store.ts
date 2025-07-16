import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@features/auth/model/authSlice';
import articlesReducer from '@features/articles/model/articlesSlice';
import usersReducer from '@features/users/model/usersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articlesReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
