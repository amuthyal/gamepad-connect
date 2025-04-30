import React, { ChangeEvent } from 'react';
import styles from '../styles/SettingsPanel.module.css';
import { useGameStore } from '../hooks/useGameStore';
import { toast } from 'react-toastify';

interface SettingsPanelProps {
  onSave: () => void;
  onReset: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ onSave, onReset }) => {
  const { selectedGame, resetMapping, exportMappings, importMappings } = useGameStore();

  const handleReset = () => {
    if (selectedGame) {
      resetMapping(selectedGame.id);
      onReset();
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        importMappings(parsed);
        toast.success('Mappings imported!');
      } catch (err) {
        toast.error('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className={styles.settingsContainer}>
      <h3 className={styles.title}>Controller Settings</h3>
      <div className={styles.actions}>
        <button className={styles.btn} onClick={onSave}>Save Mappings</button>
        <button className={styles.btnSecondary} onClick={handleReset}>Reset to Default</button>
        <button className={styles.btn} onClick={exportMappings}>Export Mappings</button>
        <label className={styles.fileLabel}>
          Import Mappings
          <input type="file" accept=".json" onChange={handleFileUpload} className={styles.fileInput} />
        </label>
      </div>
    </div>
  );
};
