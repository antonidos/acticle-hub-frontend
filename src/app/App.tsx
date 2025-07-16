import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@widgets/layout/Layout';
import HomePage from '@pages/home/HomePage';
import LoginPage from '@pages/login/LoginPage';
import RegisterPage from '@pages/register/RegisterPage';
import ArticlePage from '@pages/article/ArticlePage';
import CreateArticlePage from '@pages/create-article/CreateArticlePage';
import ProfilePage from '@pages/profile/ProfilePage';
import NotFoundPage from '@pages/404/NotFoundPage';
import { useAppSelector } from '@shared/lib/hooks';
import { selectIsAuthenticated } from '@features/auth/model/selectors';
import RouterProvider from './providers/RouterProvider';

function App() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <RouterProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />}
          />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/create" element={<CreateArticlePage />} />
          <Route
            path="/profile"
            element={
              isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </RouterProvider>
  );
}

export default App;
