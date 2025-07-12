import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
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

        <div className={styles.authLinks}>
          <Link to="/login" className={styles.authLink}>
            Войти
          </Link>
          <Link to="/register" className={styles.authButton}>
            Регистрация
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
