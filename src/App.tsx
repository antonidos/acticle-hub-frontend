import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ArticlePage from './pages/ArticlePage';
import CreateArticlePage from './pages/CreateArticlePage';
import ProfilePage from './pages/ProfilePage';
import './App.css';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { selectIsAuthenticated, selectIsInitialized } from './store/selectors';
import { verifyToken } from './store/authSlice';
import { useEffect } from 'react';

function App() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAuthInitialized = useAppSelector(selectIsInitialized);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(verifyToken());
    }
  }, []);

  useEffect(() => {
    console.log('isAuthInitialized', isAuthInitialized);
  }, [isAuthInitialized]);

  if (!isAuthInitialized) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div>Загрузка...</div>
      </div>
    );
  }

  return (
    <Router>
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
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
