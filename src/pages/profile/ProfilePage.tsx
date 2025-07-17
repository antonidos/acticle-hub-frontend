import { FC, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@shared/lib/hooks';
import { logout } from '@features/auth/model/authSlice';
import styles from './ProfilePage.module.css';
import { useParams } from 'react-router-dom';
import { selectId } from '@features/auth/model/selectors';
import { User } from '@shared/types';
import {
  selectProfileUser,
  selectProfileLoading,
} from '@features/profile/model/selectors';
import { fetchMe } from '@features/profile/model/profileSlice';
import { EditProfile } from '@features/profile/ui';

const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectId);
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const profile = useAppSelector(selectProfileUser);
  const profileLoading = useAppSelector(selectProfileLoading);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveProfile = () => {
    setIsEditModalOpen(false);
    // Обновляем данные пользователя из store
    if (profile) {
      setUser(profile);
    }
  };

  useEffect(() => {
    if (Number(id) === userId) {
      dispatch(fetchMe());
    }
  }, [id]);

  useEffect(() => {
    if (profile && Number(id) === userId) {
      setUser(profile);
    }
  }, [profile, isEditModalOpen]);

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

  if (profileLoading) {
    return (
      <div className={styles.profilePage}>
        <div className={styles.container}>
          <div className={styles.profileHeader}>
            <h1>Загрузка...</h1>
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
            {user.avatar_url ? (
              <img
                src={window.location.origin + user.avatar_url}
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
            <button
              className={`${styles.button} ${styles.secondaryButton}`}
              onClick={handleEditProfile}
            >
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

      {isEditModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <EditProfile
              onCancel={handleCloseEditModal}
              onSave={handleSaveProfile}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
