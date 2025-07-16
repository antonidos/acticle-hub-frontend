import { FC } from 'react';
import { useAppSelector, useAppDispatch } from '@shared/lib/hooks';
import { selectUser } from '@features/auth/model/selectors';
import { logout } from '@features/auth/model/authSlice';
import styles from './ProfilePage.module.css';

const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) {
    return (
      <div className={styles.profilePage}>
        <div className={styles.container}>
          <div className={styles.profileHeader}>
            <h1>Профиль не найден</h1>
            <p>Пожалуйста, войдите в систему</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        <div className={styles.profileHeader}>
          <div className={styles.avatarContainer}>
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={`Аватар ${user.username}`}
                className={styles.avatar}
              />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {user.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className={styles.userInfo}>
            <h1 className={styles.username}>{user.username}</h1>
            <p className={styles.email}>{user.email}</p>
          </div>

          <div className={styles.actions}>
            <button className={`${styles.button} ${styles.secondaryButton}`}>
              Редактировать профиль
            </button>
            <button
              className={`${styles.button} ${styles.primaryButton}`}
              onClick={handleLogout}
            >
              Выйти
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Мои статьи</h2>
          <div className={styles.articlesGrid}>
            <div className={styles.placeholder}>
              <p>Ваши статьи будут отображаться здесь</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
