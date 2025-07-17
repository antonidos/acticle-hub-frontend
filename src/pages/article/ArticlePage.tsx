import React, { useEffect } from 'react';
import styles from './ArticlePage.module.css';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import {
  selectArticlesLoading,
  selectCurrentArticle,
} from '@features/articles/model/selectors';
import { fetchArticleById } from '@features/articles/model/articlesSlice';
import { useParams } from 'react-router-dom';

const ArticlePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const article = useAppSelector(selectCurrentArticle);
  const articleLoading = useAppSelector(selectArticlesLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  if (articleLoading) {
    return (
      <div className={styles.articlePage}>
        <div className={styles.container}>
          <div className={styles.preloader} />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className={styles.articlePage}>
        <div className={styles.container}>
          <div className={styles.notFound}>Статья не найдена</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.articlePage}>
      <div className={styles.container}>
        <article className={styles.article}>
          <header className={styles.header}>
            <h1 className={styles.title}>{article.title}</h1>
            <div className={styles.meta}>
              <span className={styles.author}>
                Автор: {article.author_username}
              </span>
              <span className={styles.date}>15 января 2024</span>
            </div>
          </header>

          <div className={styles.content}>
            <p>{article.content}</p>
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
