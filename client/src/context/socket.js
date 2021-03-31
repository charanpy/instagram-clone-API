import React, { createContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import PropTypes from 'prop-types';

export const SocketContext = createContext({
  socket: '',
});

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState('');
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender?.current) {
      console.log('socket init');
      setSocket(
        io('http://localhost:3001/', {
          transports: ['websocket'],
        })
      );
      firstRender.current = false;
    }
    return () => {
      if (socket) {
        socket.emit('disconnected');
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
