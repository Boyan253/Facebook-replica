import React, { useState, useEffect } from 'react';

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('newUserResponse', (data) => {
      // Check if user already exists in the array
      const existingUser = users.find(user => user.email === data.email);
      if (existingUser) {
        return;
      }

      // Add the new user to the array
      setUsers(prevUsers => {
        // Filter out any existing users
        const newUsers = data.filter(newUser => !prevUsers.some(user => user.email === newUser.email));

        // Add the new users to the array
        return [...prevUsers, ...newUsers];
      });

    });
    socket.on('user-disconnect', (userId) => {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    });
    return () => {
      socket.off('newUserResponse');
      socket.off('user-disconnect');
    };
  }, [socket, users]);

  return (
    <div className="chat__sidebar">
      <h2>Open Global Chat</h2>
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.socketID}>{user.email}</p>
          ))}
        </div>
      </div>
    </div>
  );
};


export default ChatBar;
