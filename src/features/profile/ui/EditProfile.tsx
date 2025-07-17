import { FC, useState, useRef, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@shared/lib/hooks';
import {
  selectProfileUser,
  selectProfileLoading,
  selectProfileError,
} from '../model/selectors';
import { updateUser, addAvatar, deleteAvatar } from '../model/profileSlice';
import { User } from '@shared/types';
import styles from './EditProfile.module.css';

interface EditProfileProps {
  onCancel: () => void;
  onSave: () => void;
}

const EditProfile: FC<EditProfileProps> = ({ onCancel, onSave }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectProfileUser);
  const loading = useAppSelector(selectProfileLoading);
  const error = useAppSelector(selectProfileError);

  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    username?: string;
    email?: string;
  }>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  const validateForm = () => {
    const errors: { username?: string; email?: string } = {};

    if (!formData.username.trim()) {
      errors.username = 'Имя пользователя обязательно';
    } else if (formData.username.trim().length < 3) {
      errors.username = 'Имя пользователя должно содержать минимум 3 символа';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Некорректный email';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Очищаем ошибку валидации при изменении поля
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Проверяем тип файла
      if (!file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите изображение');
        return;
      }

      // Проверяем размер файла (макс 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Размер файла не должен превышать 5MB');
        return;
      }

      setAvatarFile(file);

      // Создаем превью
      const reader = new FileReader();
      reader.onload = e => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAvatar = async () => {
    if (window.confirm('Вы уверены, что хотите удалить аватар?')) {
      try {
        await dispatch(deleteAvatar()).unwrap();
        setAvatarFile(null);
        setAvatarPreview(null);
      } catch (error) {
        console.error('Ошибка при удалении аватара:', error);
      }
    }
  };

  const handleConfirmAvatar = async () => {
    if (avatarFile) {
      try {
        await dispatch(addAvatar(avatarFile)).unwrap();
        setAvatarFile(null);
        setAvatarPreview(null);
      } catch (error) {
        console.error('Ошибка при загрузке аватара:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Обновляем данные пользователя
      if (user) {
        const updatedUser: User = {
          ...user,
          username: formData.username.trim(),
          email: formData.email.trim(),
        };

        await dispatch(updateUser(updatedUser)).unwrap();
      }

      onSave();
    } catch (error) {
      console.error('Ошибка при сохранении профиля:', error);
    }
  };

  const currentAvatar = avatarPreview || user?.avatar_url;

  return (
    <div className={styles.editProfile}>
      <div className={styles.header}>
        <h2>Редактировать профиль</h2>
        <button type="button" className={styles.closeButton} onClick={onCancel}>
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Блок аватара */}
        <div className={styles.avatarSection}>
          <div className={styles.avatarContainer}>
            {currentAvatar ? (
              <img src={currentAvatar} alt="Аватар" className={styles.avatar} />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {formData.username.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>

          <div className={styles.avatarActions}>
            <button
              type="button"
              className={styles.uploadButton}
              onClick={() => fileInputRef.current?.click()}
            >
              {user?.avatar_url ? 'Изменить фото' : 'Загрузить фото'}
            </button>

            {avatarPreview && (
              <button
                type="button"
                className={styles.confirmButton}
                onClick={handleConfirmAvatar}
              >
                Подтвердить фото
              </button>
            )}

            {user?.avatar_url && (
              <button
                type="button"
                className={styles.deleteButton}
                onClick={handleDeleteAvatar}
              >
                Удалить фото
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className={styles.hiddenInput}
          />
        </div>

        {/* Поля формы */}
        <div className={styles.formFields}>
          <div className={styles.fieldGroup}>
            <label htmlFor="username" className={styles.label}>
              Имя пользователя
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              className={`${styles.input} ${validationErrors.username ? styles.inputError : ''}`}
              disabled={loading}
            />
            {validationErrors.username && (
              <span className={styles.errorMessage}>
                {validationErrors.username}
              </span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`${styles.input} ${validationErrors.email ? styles.inputError : ''}`}
              disabled={loading}
            />
            {validationErrors.email && (
              <span className={styles.errorMessage}>
                {validationErrors.email}
              </span>
            )}
          </div>
        </div>

        {/* Ошибка сервера */}
        {error && (
          <div className={styles.serverError}>
            Ошибка:{' '}
            {typeof error === 'string'
              ? error
              : 'Произошла ошибка при сохранении'}
          </div>
        )}

        {/* Кнопки действий */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
            disabled={loading}
          >
            Отмена
          </button>
          <button
            type="submit"
            className={styles.saveButton}
            disabled={loading}
          >
            {loading ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
