import React, { useState } from 'react';
import styles from '../styles/Controller.module.css';
import { useGameStore } from '../hooks/useGameStore';
import { toast } from 'react-toastify';
import { useWebSocket } from '../hooks/useWebSocket';

export const Controller: React.FC = () => {
  const { selectedGame, mappings, setMapping } = useGameStore();
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newLabel, setNewLabel] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const { send } = useWebSocket();

  if (!selectedGame) return null;

  const layout = selectedGame.layout.map((btn) =>
    mappings[selectedGame.id]?.[btn] || btn
  );

  const handleSave = (idx: number) => {
    const original = selectedGame.layout[idx];
    setMapping(selectedGame.id, original, newLabel);
    toast.success(`Mapped "${original}" to "${newLabel}"`);
    setEditIndex(null);
    setNewLabel('');
  };

  const handlePress = (label: string, idx: number) => {
    send(`Button pressed: ${label}`);
    setLogs((prev) => [...prev.slice(-9), `[WS] Button pressed: ${label}`]);
    setEditIndex(idx);
    setNewLabel(label);
  };

  return (
    <div className={styles.controllerContainer}>
      <h2 className={styles.heading}>{selectedGame.name} Controls</h2>
      <div className={styles.buttonGrid}>
        {layout.map((label, idx) =>
          editIndex === idx ? (
            <div key={idx} className={styles.editWrapper}>
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                className={styles.editInput}
              />
              <button onClick={() => handleSave(idx)}>Save</button>
            </div>
          ) : (
            <button
              key={idx}
              className={styles.gameButton}
              onClick={() => handlePress(label, idx)}
            >
              {label}
            </button>
          )
        )}
      </div>

      <div className={styles.console}>
        <h4>Input Log</h4>
        <ul className={styles.logList}>
          {logs.map((log, i) => (
            <li key={i} className={styles.logItem}>
              {log}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
