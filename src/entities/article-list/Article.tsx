import { Article } from '@features/articles/model/types';
import { FC } from 'react';
import styles from './Article.module.css';
import { UserAvatar } from '@shared/ui/user-avatar';
import { useNavigate } from 'react-router-dom';

const Article: FC<{ article: Article }> = ({ article }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${article.id}`);
  };

  return (
    <div className={styles.article}>
      <div className={styles.author}>
        <UserAvatar avatar={article.author_avatar} />
        <div>{article.author_username}</div>
      </div>
      <div className={styles.divider} />
      <div className={styles.content} onClick={handleClick}>
        <h3 className={styles.articleTitle}>{article.title}</h3>
        <p className={styles.articleContent}>
          {article.content.length > 100
            ? article.content.slice(0, 100) + '...'
            : article.content}
        </p>
      </div>
    </div>
  );
};

export default Article;
