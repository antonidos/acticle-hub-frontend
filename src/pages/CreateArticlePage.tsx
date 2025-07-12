import React from 'react';
import styles from './CreateArticlePage.module.css';

const CreateArticlePage: React.FC = () => {
  return (
    <div className={styles.createArticlePage}>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Создать новую статью</h1>

          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Заголовок статьи</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Введите заголовок"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Краткое описание</label>
              <textarea
                className={styles.textarea}
                rows={3}
                placeholder="Краткое описание статьи"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Содержание</label>
              <textarea
                className={styles.contentTextarea}
                rows={15}
                placeholder="Содержание статьи"
              />
            </div>

            <div className={styles.actions}>
              <button type="button" className={styles.cancelButton}>
                Отмена
              </button>
              <button type="submit" className={styles.submitButton}>
                Опубликовать
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateArticlePage;
