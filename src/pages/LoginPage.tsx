import { ChangeEvent, FC, useCallback, useState } from 'react';
import styles from './LoginPage.module.css';
import { LoginForm } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectAuthError, selectAuthLoading } from '../store/selectors';
import {
  validateEmail,
  validateLoginForm,
  validatePassword,
  ValidationErrors,
} from '../utils/validation';
import { loginUser } from '../store/authSlice';
import { debounce } from 'lodash';

const LoginPage: FC = () => {
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<ValidationErrors<LoginForm>>({});

  const dispatch = useAppDispatch();
  const selectorAuthLoading = useAppSelector(selectAuthLoading);
  const selectorAuthError = useAppSelector(selectAuthError);

  const debouncedValidateEmail = useCallback(
    debounce((field: keyof LoginForm, value: string) => {
      const error = validateEmail(value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }, 1000),
    []
  );

  const debouncedValidatePassword = useCallback(
    debounce((field: keyof LoginForm, value: string) => {
      const error = validatePassword(value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }, 1000),
    []
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof LoginForm
  ) => {
    const { value } = e.target;
    setForm(prev => ({ ...prev, [field]: value }));
    switch (field) {
      case 'email': {
        debouncedValidateEmail(field, value);
        break;
      }
      case 'password': {
        debouncedValidatePassword(field, value);
        break;
      }
    }
  };

  const handleLogin = () => {
    const newErrors = validateLoginForm(form);

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(
      error => error !== undefined
    );

    if (!hasErrors) {
      dispatch(loginUser(form));
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        {selectorAuthLoading ? (
          <>
            <div className={styles.preloader}></div>
            <div className={styles.wrapper}></div>
          </>
        ) : null}
        <h1 className={styles.title}>Вход в систему</h1>
        <form className={styles.form}>
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
              placeholder="Введите ваш пароль"
              value={form.password}
              onChange={e => handleChange(e, 'password')}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>
          {selectorAuthError && (
            <span className={styles.error}>{selectorAuthError}</span>
          )}
          <button type="button" className={styles.button} onClick={handleLogin}>
            Войти
          </button>
        </form>
        <p className={styles.link}>
          Нет аккаунта? <a href="/register">Зарегистрироваться</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
