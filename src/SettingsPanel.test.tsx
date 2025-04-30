/// <reference types="@testing-library/jest-dom" />

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SettingsPanel } from './components/SettingsPanel';

jest.mock('./hooks/useGameStore', () => ({
  useGameStore: () => ({
    selectedGame: { id: 'g1', name: 'Speed Racer', layout: [] },
    resetMapping: jest.fn(),
  }),
}));

describe('SettingsPanel', () => {
  const onSaveMock = jest.fn();
  const onResetMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all buttons and handles Save and Reset', () => {
    render(<SettingsPanel onSave={onSaveMock} onReset={onResetMock} />);

    const saveBtn = screen.getByText('Save Mappings');
    const resetBtn = screen.getByText('Reset to Default');

    fireEvent.click(saveBtn);
    expect(onSaveMock).toHaveBeenCalled();

    fireEvent.click(resetBtn);
    expect(onResetMock).toHaveBeenCalled();
  });
});
