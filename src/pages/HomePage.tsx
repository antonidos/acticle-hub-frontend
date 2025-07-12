import React from 'react';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>Добро пожаловать в ArticleHub</h1>
          <p className={styles.subtitle}>
            Место для создания и чтения качественного контента
          </p>
        </div>
      </section>

      <section className={styles.articles}>
        <h2 className={styles.sectionTitle}>Последние статьи</h2>
        <div className={styles.articleGrid}>
          {/* Здесь будут отображаться статьи */}
          <div className={styles.placeholder}>
            <p>Статьи будут отображаться здесь</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
