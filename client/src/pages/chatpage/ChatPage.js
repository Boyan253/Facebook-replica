import React, { useEffect, useState } from 'react';
import ChatBar from '../../components/chatbar/ChatBar';
import ChatBody from '../../components/chatbody/ChatBody';
import ChatFooter from '../../components/chatfooter/ChatFooter';
import './chatpage.css'
import socketIO from 'socket.io-client'

const socket = socketIO.connect('www.thefuture.com');
const ChatPage = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('messageResponse', (data) => {
          setMessages((prevMessages) => [...prevMessages, data]);
        });
      }, []);
      


    // useEffect(() => {
    //     fetch('http://localhost:4000/messages')
    //         .then(response => response.json())
    //         .then(data => setMessages(data))
    //         .catch(error => console.error(error));

    // }, []);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (localStorage.getItem('userName')) {
            e.preventDefault();

            const formData = new FormData(e.target)

            const userData = Object.fromEntries(formData)

            socket.emit('message', {
                text: userData.message,
                name: localStorage.getItem('userName'),
                _id: `${socket.id}${Math.random()}`,
                socketID: socket.id,
            });



        }
    };
    return (
        <div className="chat">
            <ChatBar socket={socket} />
            <div className="chat__main">
                <ChatBody messages={messages} />
                <ChatFooter socket={socket} handleSendMessage={handleSendMessage} />
            </div>
        </div>
    );
};

export default ChatPage;
