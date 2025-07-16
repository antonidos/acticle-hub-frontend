import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectIsAuthenticated } from '../../store/selectors';
import { logout } from '../../store/authSlice';

const Header: React.FC = () => {
  const isAuth = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          ArticleHub
        </Link>

        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Главная
          </Link>
          <Link to="/create" className={styles.navLink}>
            Создать статью
          </Link>
        </nav>
        {isAuth ? (
          <div className={styles.authLinks}>
            <Link to="/profile" className={styles.authLink}>
              Профиль
            </Link>
            <button className={styles.authButton} onClick={handleLogout}>
              Выйти
            </button>
          </div>
        ) : (
          <div className={styles.authLinks}>
            <Link to="/login" className={styles.authLink}>
              Войти
            </Link>
            <Link to="/register" className={styles.authButton}>
              Регистрация
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
