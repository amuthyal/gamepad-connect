import { create } from 'zustand';

interface Game {
  id: string;
  name: string;
  layout: string[];
}

interface GameStore {
  games: Game[];
  selectedGame: Game | null;
  mappings: { [gameId: string]: { [button: string]: string } };
  setGames: (games: Game[]) => void;
  selectGame: (gameId: string) => void;
  setMapping: (gameId: string, button: string, newAction: string) => void;
  resetMapping: (gameId: string) => void;
  exportMappings: () => void;
  importMappings: (data: { [key: string]: { [btn: string]: string } }) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  games: [],
  selectedGame: null,
  mappings: JSON.parse(localStorage.getItem('mappings') || '{}'),

  setGames: (games) => set({ games }),

  selectGame: (gameId) => {
    const game = get().games.find((g) => g.id === gameId) || null;
    set({ selectedGame: game });
  },

  setMapping: (gameId, button, newAction) => {
    const updated = {
      ...get().mappings,
      [gameId]: {
        ...(get().mappings[gameId] || {}),
        [button]: newAction,
      },
    };
    localStorage.setItem('mappings', JSON.stringify(updated));
    set({ mappings: updated });
  },

  resetMapping: (gameId) => {
    const updated = { ...get().mappings };
    delete updated[gameId];
    localStorage.setItem('mappings', JSON.stringify(updated));
    set({ mappings: updated });
  },

  exportMappings: () => {
    const dataStr = JSON.stringify(get().mappings, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'gamepad-mappings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  importMappings: (data) => {
    localStorage.setItem('mappings', JSON.stringify(data));
    set({ mappings: data });
  },
}));
