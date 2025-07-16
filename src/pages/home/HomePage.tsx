import React from 'react';
import styles from './HomePage.module.css';
import ArticlesList from '@widgets/acticles-list/ActiclesList';

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
          <ArticlesList />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
