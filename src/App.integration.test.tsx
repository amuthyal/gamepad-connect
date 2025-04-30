/// <reference types="@testing-library/jest-dom" />

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App'; // Update if your component wrapper is different

// ✅ Mock global fetch for GameSelector
beforeAll(() => {
  globalThis.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 'g1', name: 'Speed Racer', layout: ['left', 'right'] },
          { id: 'g2', name: 'Battle Zone', layout: ['fire', 'jump'] }
        ])
    })
  ) as jest.Mock;
});

// Mocks
const setGamesMock = jest.fn();
const selectGameMock = jest.fn();
const setMappingMock = jest.fn();
const resetMappingMock = jest.fn();
const importMappingsMock = jest.fn();
const exportMappingsMock = jest.fn();
const sendMock = jest.fn();

jest.mock('./hooks/useGameStore', () => ({
  useGameStore: () => ({
    games: [
      { id: 'g1', name: 'Speed Racer', layout: ['left', 'right'] },
      { id: 'g2', name: 'Battle Zone', layout: ['fire', 'jump'] }
    ],
    selectedGame: { id: 'g1', name: 'Speed Racer', layout: ['left', 'right'] },
    mappings: {
      g1: { left: 'move left', right: 'move right' }
    },
    setGames: setGamesMock,
    selectGame: selectGameMock,
    setMapping: setMappingMock,
    resetMapping: resetMappingMock,
    importMappings: importMappingsMock,
    exportMappings: exportMappingsMock
  })
}));

jest.mock('./hooks/useWebSocket', () => ({
  useWebSocket: () => ({
    send: sendMock
  })
}));

describe('App Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('allows selecting a game, editing a control, and triggering settings actions', async () => {
    render(<App />);

    // Game selection
    const select = screen.getByLabelText('Select a Game');
    fireEvent.change(select, { target: { value: 'g2' } });
    expect(selectGameMock).toHaveBeenCalledWith('g2');

    // Press a button
    fireEvent.click(screen.getByText('move left'));
    expect(sendMock).toHaveBeenCalledWith('Button pressed: move left');

    // Edit and save
    fireEvent.click(screen.getByText('move right'));
    const input = screen.getByDisplayValue('move right');
    fireEvent.change(input, { target: { value: 'drift' } });
    fireEvent.click(screen.getByText('Save'));
    expect(setMappingMock).toHaveBeenCalledWith('g1', 'right', 'drift');

    // Settings actions
    fireEvent.click(screen.getByText('Save Mappings'));
    fireEvent.click(screen.getByText('Reset to Default'));
    fireEvent.click(screen.getByText('Export Mappings'));

    expect(resetMappingMock).toHaveBeenCalledWith('g1');
    expect(exportMappingsMock).toHaveBeenCalled();

    // Upload a file
    const fakeFile = new File(
      [JSON.stringify({ g1: { left: 'slide' } })],
      'import.json',
      { type: 'application/json' }
    );

    const fileInput = screen.getByLabelText('Import Mappings');
    fireEvent.change(fileInput, { target: { files: [fakeFile] } });

    await waitFor(() => {
      expect(importMappingsMock).toHaveBeenCalledWith({ g1: { left: 'slide' } });
    });
  });
});
