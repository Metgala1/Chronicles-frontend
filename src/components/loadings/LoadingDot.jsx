import React from 'react';
import styles from './Dots.module.css';

const LoadingDots = () => {
  return (
    <div className={styles.loadingDotsContainer}>
      <span className={`${styles.dot} ${styles.dot1}`}></span>
      <span className={`${styles.dot} ${styles.dot2}`}></span>
      <span className={`${styles.dot} ${styles.dot3}`}></span>
    </div>
  );
};

export default LoadingDots;