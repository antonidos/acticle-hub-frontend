import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { increment, decrement, incrementByAmount } from '../store/counterSlice';
import styles from './Counter.module.css';

export const Counter: React.FC = () => {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.counter}>
      <h2 className={styles.title}>Redux Counter</h2>
      <div className={styles.value}>{count}</div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => dispatch(increment())}>
          +
        </button>
        <button className={styles.button} onClick={() => dispatch(decrement())}>
          -
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(5))}
        >
          +5
        </button>
      </div>
    </div>
  );
};
