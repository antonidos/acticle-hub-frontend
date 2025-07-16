import { LoginForm, RegistrationForm } from '../types';

export type ValidationErrors<T> = Partial<T>;

export const validateUsername = (value: string): string | undefined => {
  if (!value?.trim()) return 'Имя обязательно для заполнения';
  if (value.length < 2) return 'Имя должно содержать минимум 2 символа';
  return undefined;
};

export const validateEmail = (value: string): string | undefined => {
  console.log(value);
  if (!value?.trim()) return 'Email обязателен для заполнения';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return 'Неверный формат email';
  return undefined;
};

export const validatePassword = (value: string): string | undefined => {
  if (!value?.trim()) return 'Пароль обязателен для заполнения';
  if (value.length < 6) return 'Пароль должен содержать минимум 6 символов';
  return undefined;
};

export const validateConfirmPassword = (
  value: string,
  originalPassword: string
): string | undefined => {
  if (!value) return 'Подтверждение пароля обязательно';
  if (value !== originalPassword) return 'Пароли не совпадают';
  return undefined;
};

export const validateRegistrationForm = (
  form: RegistrationForm
): ValidationErrors<RegistrationForm> => {
  const { username, email, password, confirmPassword } = form;

  return {
    username: validateUsername(username),
    email: validateEmail(email),
    password: validatePassword(password),
    confirmPassword: validateConfirmPassword(confirmPassword, password),
  };
};

export const validateLoginForm = (
  form: LoginForm
): ValidationErrors<LoginForm> => {
  const { email, password } = form;

  return {
    email: validateEmail(email),
    password: validatePassword(password),
  };
};
