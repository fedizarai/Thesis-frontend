import React, { useContext, createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const userId = Cookies.get('userid'); // Retrieve the user ID from cookies
    const newSocket = io("http://localhost:3001", {
      query: { userId },
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 5000,
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
