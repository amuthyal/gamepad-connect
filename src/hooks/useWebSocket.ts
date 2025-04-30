import { useEffect, useRef } from 'react';

export const useWebSocket = () => {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');

    ws.current.onopen = () => {
      console.log('[WebSocket] Connected to server');
    };

    ws.current.onmessage = (event) => {
      console.log('[WebSocket] Server says:', event.data);
    };

    ws.current.onclose = () => {
      console.log('[WebSocket] Disconnected');
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const send = (msg: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(msg);
    }
  };

  return { send };
};
