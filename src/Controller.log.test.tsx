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
      layout: Array.from({ length: 12 }, (_, i) => `btn${i + 1}`)
    },
    mappings: {
      g1: Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`btn${i + 1}`, `Label ${i + 1}`]))
    },
    setMapping: jest.fn(),
  }),
}));

// ✅ Mock WebSocket with real-time send simulation
jest.mock('./hooks/useWebSocket', () => {
  return {
    useWebSocket: () => ({
      send: jest.fn()
    }),
  };
});

describe('Controller - Log Console', () => {
  it('shows the last 10 WebSocket logs in order', () => {
    render(<Controller />);

    // Click first 11 buttons (simulate overflow)
    for (let i = 1; i <= 11; i++) {
      fireEvent.click(screen.getByText(`Label ${i}`));
    }

    const logItems = screen.getAllByRole('listitem');

    // ✅ Should only render the latest 10
    expect(logItems).toHaveLength(10);

    // ✅ First visible log should be from btn2, not btn1
    expect(logItems[0]).toHaveTextContent('Button pressed: Label 2');
    expect(logItems[9]).toHaveTextContent('Button pressed: Label 11');
  });
});
