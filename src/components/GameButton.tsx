import React from 'react';
import styles from '../styles/GameButton.module.css';

interface GameButtonProps {
  label: string;
  onClick: () => void;
}

export const GameButton: React.FC<GameButtonProps> = ({ label, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {label}
    </button>
  );
};
