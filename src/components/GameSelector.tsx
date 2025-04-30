import React, { useEffect } from 'react';
import styles from '../styles/GameSelector.module.css';
import { useGameStore } from '../hooks/useGameStore';

export const GameSelector: React.FC = () => {
  const { games, setGames, selectedGame, selectGame } = useGameStore();

  useEffect(() => {
    fetch('/games.json')
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        selectGame(data[0]?.id); // default selection
      });
  }, []);

  return (
    <div className={styles.wrapper}>
      <label htmlFor="gameSelect" className={styles.label}>
        Select a Game
      </label>
      <select
        id="gameSelect"
        className={styles.select}
        value={selectedGame?.id || ''}
        onChange={(e) => selectGame(e.target.value)}
      >
        {games.map((game) => (
          <option key={game.id} value={game.id}>
            {game.name}
          </option>
        ))}
      </select>
    </div>
  );
};
