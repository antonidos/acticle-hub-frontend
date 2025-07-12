import React from 'react';
import styles from './RegisterPage.module.css';

const RegisterPage: React.FC = () => {
  return (
    <div className={styles.registerPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Регистрация</h1>
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Имя</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Введите ваше имя"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              placeholder="Введите ваш email"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Пароль</label>
            <input
              type="password"
              className={styles.input}
              placeholder="Введите пароль"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Подтверждение пароля</label>
            <input
              type="password"
              className={styles.input}
              placeholder="Подтвердите пароль"
            />
          </div>
          <button type="submit" className={styles.button}>
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
