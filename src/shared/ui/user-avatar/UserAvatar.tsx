import { FC } from 'react';
import styles from './UserAvatar.module.css';

const UserAvatar: FC<{ avatar?: string }> = ({ avatar }) => {
  return (
    <div className={styles.userAvatar}>
      {avatar ? <img src={avatar} alt="User Avatar" /> : ''}
    </div>
  );
};

export default UserAvatar;
