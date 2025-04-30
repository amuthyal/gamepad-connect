/// <reference types="@testing-library/jest-dom" />

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SettingsPanel } from './components/SettingsPanel';

// ✅ Zustand store mock inline
const importMappingsMock = jest.fn();
const exportMappingsMock = jest.fn();
const resetMappingMock = jest.fn();

jest.mock('./hooks/useGameStore', () => ({
  useGameStore: () => ({
    selectedGame: { id: 'g1', name: 'Speed Racer', layout: [] },
    resetMapping: resetMappingMock,
    importMappings: importMappingsMock,
    exportMappings: exportMappingsMock,
  }),
}));

describe('SettingsPanel - Import/Export Mappings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls importMappings when a JSON file is uploaded', async () => {
    render(<SettingsPanel onSave={jest.fn()} onReset={jest.fn()} />);

    const fileInput = screen.getByLabelText('Import Mappings') as HTMLInputElement;

    const fakeFile = new File(
      [JSON.stringify({ g1: { left: 'slide' } })],
      'test-mappings.json',
      { type: 'application/json' }
    );

    fireEvent.change(fileInput, {
      target: { files: [fakeFile] }
    });

    await waitFor(() => {
      expect(importMappingsMock).toHaveBeenCalledWith({ g1: { left: 'slide' } });
    });
  });

  it('calls exportMappings when Export button is clicked', () => {
    render(<SettingsPanel onSave={jest.fn()} onReset={jest.fn()} />);
    fireEvent.click(screen.getByText('Export Mappings'));
    expect(exportMappingsMock).toHaveBeenCalled();
  });
});
