/// <reference types="@testing-library/jest-dom" />

import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameSelector } from './components/GameSelector';
import { useGameStore } from './hooks/useGameStore';

// ✅ Mock Zustand store
jest.mock('./hooks/useGameStore');

const mockedUseStore = useGameStore as jest.MockedFunction<typeof useGameStore>;

// ✅ Mock fetch() globally using globalThis
(globalThis.fetch as jest.Mock) = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 'g1', name: 'Speed Racer', layout: [] },
        { id: 'g2', name: 'Battle Zone', layout: [] }
      ])
  })
);

// ✅ Test block
describe('GameSelector', () => {
  it('renders game options from store', () => {
    mockedUseStore.mockReturnValue({
      games: [
        { id: 'g1', name: 'Speed Racer', layout: [] },
        { id: 'g2', name: 'Battle Zone', layout: [] }
      ],
      selectedGame: { id: 'g1', name: 'Speed Racer', layout: [] },
      setGames: jest.fn(),
      selectGame: jest.fn()
    });

    render(<GameSelector />);
    expect(screen.getByLabelText(/Select a Game/i)).toBeInTheDocument();
    expect(screen.getByText('Speed Racer')).toBeInTheDocument();
    expect(screen.getByText('Battle Zone')).toBeInTheDocument();
  });
});
