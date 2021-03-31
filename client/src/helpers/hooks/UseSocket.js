import { useEffect } from 'react';

const UseSocket = (socket, send) => {
  useEffect(() => {
    if (socket) {
      console.log(socket);
      socket.on('message', ({ groupId, message }) => {
        console.log(groupId, message);
        send(groupId, message, socket);
      });
    }
  }, [socket, send]);
};

export default UseSocket;
