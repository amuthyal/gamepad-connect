import React, { useState } from 'react';
import './index.css';
import { GameSelector } from './components/GameSelector';
import { Controller } from './components/Controller';
import { SettingsPanel } from './components/SettingsPanel';
import { DeveloperConsole } from './components/DeveloperConsole';
import styles from './styles/App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => setLogs((prev) => [...prev, msg]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>GamePad Connect</h1>

      <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar />

      <div className={styles.card}><GameSelector /></div>
      <div className={styles.card}><Controller /></div>
      <div className={styles.card}>
        <SettingsPanel
          onSave={() => {
            toast.success('Mappings saved');
            addLog('Mappings saved');
          }}
          onReset={() => {
            toast.info('Mappings reset to default');
            addLog('Mappings reset');
          }}
        />
      </div>
      <div className={styles.card}><DeveloperConsole logs={logs} /></div>
    </div>
  );
};

export default App;
