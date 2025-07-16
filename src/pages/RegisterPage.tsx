import { ChangeEvent, useState, FC, useCallback } from 'react';
import styles from './RegisterPage.module.css';
import {
  ValidationErrors,
  validateEmail,
  validateConfirmPassword,
  validatePassword,
  validateRegistrationForm,
  validateUsername,
} from '../utils/validation';
import { RegistrationForm } from '../types';
import { selectAuthError, selectAuthLoading } from '../store/selectors';
import { registerUser } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { debounce } from 'lodash';

const RegisterPage: FC = () => {
  const [form, setForm] = useState<RegistrationForm>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<ValidationErrors<RegistrationForm>>({});

  const dispatch = useAppDispatch();
  const selectorAuthLoading = useAppSelector(selectAuthLoading);
  const selectorAuthError = useAppSelector(selectAuthError);

  const debouncedValidateEmail = useCallback(
    debounce((field: keyof RegistrationForm, value: string) => {
      const error = validateEmail(value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }, 1000),
    []
  );

  const debouncedValidateUsername = useCallback(
    debounce((field: keyof RegistrationForm, value: string) => {
      const error = validateUsername(value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }, 1000),
    []
  );

  const debouncedValidatePassword = useCallback(
    debounce((field: keyof RegistrationForm, value: string) => {
      const error = validatePassword(value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }, 1000),
    []
  );

  const debouncedValidateConfirmPassword = useCallback(
    debounce(
      (field: keyof RegistrationForm, value: string, password: string) => {
        const error = validateConfirmPassword(value, password);
        setErrors(prev => ({ ...prev, [field]: error }));
      },
      1000
    ),
    []
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof RegistrationForm
  ) => {
    const { value } = e.target;
    setForm(prev => ({ ...prev, [field]: value }));
    switch (field) {
      case 'email': {
        debouncedValidateEmail(field, value);
        break;
      }
      case 'username': {
        debouncedValidateUsername(field, value);
        break;
      }
      case 'password': {
        debouncedValidatePassword(field, value);
        debouncedValidateConfirmPassword(
          'confirmPassword',
          form.confirmPassword,
          value
        );
        break;
      }
      case 'confirmPassword': {
        debouncedValidateConfirmPassword(field, value, form.password);
        break;
      }
    }
  };

  const handleRegister = () => {
    const { username, email, password } = form;
    const newErrors = validateRegistrationForm(form);

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(
      error => error !== undefined
    );

    if (!hasErrors) {
      dispatch(registerUser({ username, email, password }));
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.container}>
        {selectorAuthLoading ? (
          <>
            <div className={styles.preloader}></div>
            <div className={styles.wrapper}></div>
          </>
        ) : null}
        <h1 className={styles.title}>Регистрация</h1>
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Имя</label>
            <input
              type="text"
              className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
              placeholder="Введите ваше имя"
              value={form.username}
              onChange={e => handleChange(e, 'username')}
            />
            {errors.username && (
              <span className={styles.error}>{errors.username}</span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="Введите ваш email"
              value={form.email}
              onChange={e => handleChange(e, 'email')}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Пароль</label>
            <input
              type="password"
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              placeholder="Введите пароль"
              value={form.password}
              onChange={e => handleChange(e, 'password')}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Подтверждение пароля</label>
            <input
              type="password"
              className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
              placeholder="Подтвердите пароль"
              value={form.confirmPassword}
              onChange={e => handleChange(e, 'confirmPassword')}
            />
            {errors.confirmPassword && (
              <span className={styles.error}>{errors.confirmPassword}</span>
            )}
          </div>
          {selectorAuthError && (
            <span className={styles.error}>{selectorAuthError}</span>
          )}
          <button
            type="button"
            className={styles.button}
            disabled={Object.values(errors).some(error => error !== undefined)}
            onClick={handleRegister}
          >
            Зарегистрироваться
          </button>
        </form>
        <p className={styles.link}>
          Уже есть аккаунт? <a href="/login">Войти</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
