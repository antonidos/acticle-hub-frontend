import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.title}>ArticleHub</h3>
            <p className={styles.description}>
              Платформа для создания и чтения качественного контента
            </p>
          </div>

          <div className={styles.section}>
            <h4 className={styles.subtitle}>Навигация</h4>
            <ul className={styles.links}>
              <li>
                <a href="/" className={styles.link}>
                  Главная
                </a>
              </li>
              <li>
                <a href="/login" className={styles.link}>
                  Вход
                </a>
              </li>
              <li>
                <a href="/register" className={styles.link}>
                  Регистрация
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.subtitle}>Информация</h4>
            <ul className={styles.links}>
              <li>
                <a href="#" className={styles.link}>
                  О нас
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Контакты
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Политика конфиденциальности
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2024 ArticleHub. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
