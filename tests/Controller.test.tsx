/// <reference types="@testing-library/jest-dom" />

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Controller } from '../src/components/Controller';
import { useGameStore } from '../src/hooks/useGameStore';

// ✅ Mock Zustand store
jest.mock('./hooks/useGameStore');

const setMappingMock = jest.fn();
const mockedUseStore = useGameStore as jest.MockedFunction<typeof useGameStore>;

describe('Controller', () => {
  beforeEach(() => {
    mockedUseStore.mockReturnValue({
      selectedGame: {
        id: 'g1',
        name: 'Speed Racer',
        layout: ['left', 'right', 'accelerate', 'brake'],
      },
      mappings: {
        g1: {
          left: 'drift left',
          right: 'drift right',
          accelerate: 'boost',
          brake: 'slow down',
        },
      },
      setMapping: setMappingMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls setMapping when a label is edited and saved', () => {
    render(<Controller />);

    // Click to edit "drift left"
    fireEvent.click(screen.getByText('drift left'));

    // Type new label
    const input = screen.getByDisplayValue('drift left');
    fireEvent.change(input, { target: { value: 'slide' } });

    // Save
    fireEvent.click(screen.getByText('Save'));

    // ✅ Expect Zustand setMapping to be called with updated label
    expect(setMappingMock).toHaveBeenCalledWith('g1', 'left', 'slide');
  });
});
