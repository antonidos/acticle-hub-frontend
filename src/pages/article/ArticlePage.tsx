import React from 'react';
import styles from './ArticlePage.module.css';

const ArticlePage: React.FC = () => {
  return (
    <div className={styles.articlePage}>
      <div className={styles.container}>
        <article className={styles.article}>
          <header className={styles.header}>
            <h1 className={styles.title}>Заголовок статьи</h1>
            <div className={styles.meta}>
              <span className={styles.author}>Автор: Имя Автора</span>
              <span className={styles.date}>15 января 2024</span>
            </div>
          </header>

          <div className={styles.content}>
            <p>
              Здесь будет содержимое статьи. Пока что это заглушка для
              демонстрации дизайна страницы статьи.
            </p>
          </div>

          <footer className={styles.footer}>
            <div className={styles.actions}>
              <button className={styles.likeButton}>❤️ Нравится (0)</button>
              <button className={styles.shareButton}>📤 Поделиться</button>
            </div>
          </footer>
        </article>

        <section className={styles.comments}>
          <h2 className={styles.commentsTitle}>Комментарии</h2>
          <div className={styles.commentsPlaceholder}>
            <p>Комментарии будут отображаться здесь</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArticlePage;
