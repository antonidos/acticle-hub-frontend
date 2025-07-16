import { FC, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { verifyToken } from '@features/auth/model/authSlice';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { selectIsInitialized } from '@features/auth/model/selectors';

const RouterProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthInitialized = useAppSelector(selectIsInitialized);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(verifyToken());
    }
  }, []);

  if (!isAuthInitialized) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div>Загрузка...</div>
      </div>
    );
  }

  return <Router>{children}</Router>;
};

export default RouterProvider;
