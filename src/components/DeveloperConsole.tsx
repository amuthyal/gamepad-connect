import React from 'react';
import styles from '../styles/DeveloperConsole.module.css';

interface DeveloperConsoleProps {
  logs: string[];
}

export const DeveloperConsole: React.FC<DeveloperConsoleProps> = ({ logs }) => {
  return (
    <div className={styles.console}>
      <h4 className={styles.title}>Developer Mode</h4>
      <div className={styles.logBox}>
        {logs.length === 0 ? (
          <p className={styles.empty}>No events yet</p>
        ) : (
          logs.map((log, index) => <div key={index} className={styles.log}>{log}</div>)
        )}
      </div>
    </div>
  );
};
