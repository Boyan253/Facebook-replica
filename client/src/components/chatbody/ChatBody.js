import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
const ChatBody = ({ messages }) => {
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const newSocket = io('https://future-server.onrender.com');
    setSocket(newSocket);

    // Clean up function to disconnect socket on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleLeaveChat = () => {
    socket.emit('user-disconnect', socket.id);
    navigate('/posts');
  };
  
  return (
    <>
      <header className="chat__mainHeader">
        <p>Chat with Friends</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE ROOM
        </button>
      </header>

      <div className="message__container">
        {messages.map((message) =>
          message.name === localStorage.getItem('userName') ? (
            <div className="message__chats" key={message._id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className="message__status">
          {/* <p>Someone is typing...</p> */}
        </div>
      </div>
    </>
  );
};

export default ChatBody;
