/// <reference types="@testing-library/jest-dom" />

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Controller } from './components/Controller';

// ✅ Mock Zustand
jest.mock('./hooks/useGameStore', () => ({
  useGameStore: () => ({
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
    setMapping: jest.fn(),
  }),
}));

// ✅ Mock WebSocket hook
const sendMock = jest.fn();

jest.mock('./hooks/useWebSocket', () => ({
  useWebSocket: () => ({
    send: sendMock,
  }),
}));

describe('Controller - WebSocket', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sends WebSocket message on button press', () => {
    render(<Controller />);

    const button = screen.getByText('drift left');
    fireEvent.click(button);

    expect(sendMock).toHaveBeenCalledWith('Button pressed: drift left');
  });

  it('only sends message on button press, not during editing/save', () => {
    render(<Controller />);

    fireEvent.click(screen.getByText('drift right')); // triggers 1st send

    const input = screen.getByDisplayValue('drift right');
    fireEvent.change(input, { target: { value: 'turn' } });
    fireEvent.click(screen.getByText('Save'));

    // ✅ Ensure send was called once (from initial press only)
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith('Button pressed: drift right');
  });
});
