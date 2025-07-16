import React, { useCallback, useState } from 'react';
import styles from './CreateArticlePage.module.css';
import {
  validateArticleForm,
  validateContent,
  validateTitle,
  ValidationErrors,
} from '@shared/lib/validation';
import { debounce } from 'lodash';
import { ArticleForm } from '@features/articles/model/types';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { createArticle } from '@features/articles/model/articlesSlice';
import { selectArticlesError } from '@features/articles/model/selectors';

const CreateArticlePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectorArticlesError = useAppSelector(selectArticlesError);

  const [form, setForm] = useState<ArticleForm>({
    title: '',
    content: '',
  });

  const [errors, setErrors] = useState<ValidationErrors<ArticleForm>>({
    title: '',
    content: '',
  });

  const debouncedValidateTitle = useCallback(
    debounce((field: keyof ArticleForm, title: string) => {
      const error = validateTitle(title);
      setErrors(prev => ({ ...prev, [field]: error }));
    }, 1000),
    []
  );

  const debouncedValidateContent = useCallback(
    debounce((field: keyof ArticleForm, content: string) => {
      const error = validateContent(content);
      setErrors(prev => ({ ...prev, [field]: error }));
    }, 1000),
    []
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof ArticleForm
  ) => {
    const { value } = e.target;
    setForm(prev => ({ ...prev, [field]: value }));
    switch (field) {
      case 'title': {
        debouncedValidateTitle(field, value);
        break;
      }
      case 'content': {
        debouncedValidateContent(field, value);
        break;
      }
    }
  };

  const handleSubmit = () => {
    const errors = validateArticleForm(form);
    setErrors(errors);

    if (Object.values(errors).some(error => error)) {
      return;
    }

    dispatch(createArticle(form));
  };

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
                value={form.title}
                onChange={e => handleChange(e, 'title')}
              />
              {errors.title && (
                <div className={styles.error}>{errors.title}</div>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Содержание</label>
              <textarea
                className={styles.contentTextarea}
                rows={15}
                placeholder="Содержание статьи"
                value={form.content}
                onChange={e => handleChange(e, 'content')}
              />
              {errors.content && (
                <div className={styles.error}>{errors.content}</div>
              )}
            </div>

            {selectorArticlesError && (
              <div className={styles.error}>{selectorArticlesError}</div>
            )}

            <div className={styles.actions}>
              <button type="button" className={styles.cancelButton}>
                Отмена
              </button>
              <button
                type="button"
                className={styles.submitButton}
                onClick={handleSubmit}
              >
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
