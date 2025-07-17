import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { fetchArticles } from '@features/articles/model/articlesSlice';
import { selectAllArticles } from '@features/articles/model/selectors';
import { Article } from '@entities/article-list';

const ActiclesList: FC = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector(selectAllArticles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <div>
      {articles.map(article => (
        <Article key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ActiclesList;
