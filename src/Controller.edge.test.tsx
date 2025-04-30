/// <reference types="@testing-library/jest-dom" />

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Controller } from './components/Controller';
import { SettingsPanel } from './components/SettingsPanel';

// ✅ Mock Zustand with no selected game
const resetMappingMock = jest.fn();

jest.mock('./hooks/useGameStore', () => ({
  useGameStore: () => ({
    selectedGame: null, // 🔴 no game selected
    resetMapping: resetMappingMock,
    importMappings: jest.fn(),
    exportMappings: jest.fn()
  }),
}));

describe('Edge Cases - No Selected Game', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render Controller UI if no game is selected', () => {
    render(<Controller />);
    expect(screen.queryByText(/Controls/i)).not.toBeInTheDocument();
  });

  it('does not call resetMapping or onReset if no game is selected in SettingsPanel', () => {
    const onResetMock = jest.fn();

    render(<SettingsPanel onSave={jest.fn()} onReset={onResetMock} />);
    const resetBtn = screen.getByText('Reset to Default');
    fireEvent.click(resetBtn);

    // ✅ Neither should be called since selectedGame is null
    expect(onResetMock).not.toHaveBeenCalled();
    expect(resetMappingMock).not.toHaveBeenCalled();
  });
});
