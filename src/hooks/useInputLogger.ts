import { useCallback } from 'react';

export const useInputLogger = (sendLog: (msg: string) => void) => {
  const sendInput = useCallback((button: string) => {
    const message = `Button pressed: ${button}`;

    // Simulate WebSocket delay
    setTimeout(() => {
      // "Send" to server
      sendLog(`[WS] ${message}`);
    }, 200);
  }, [sendLog]);

  return { sendInput };
};
