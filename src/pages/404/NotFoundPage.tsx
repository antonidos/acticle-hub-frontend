import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage: FC = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className={styles.notFoundPage}>
      <div className={styles.container}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Страница не найдена</h1>
        <p className={styles.description}>
          К сожалению, запрашиваемая страница не существует или была перемещена.
        </p>
        <div className={styles.countdown}>
          <div className={styles.countdownIcon}>🏠</div>
          <p className={styles.countdownText}>
            Автоматический переход на главную страницу через{' '}
            <span className={styles.countdownNumber}>{countdown}</span>{' '}
            {countdown === 1 ? 'секунду' : 'секунды'}
          </p>
        </div>
        <button
          className={styles.homeButton}
          onClick={() => navigate('/')}
          type="button"
        >
          Перейти на главную
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
