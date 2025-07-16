import { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from '@shared/config/store';

const StoreProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
