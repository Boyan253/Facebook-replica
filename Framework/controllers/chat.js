const express = require('express');
const router = express.Router();
const ChatRoom = require('../models/Chat');
const Message = require('../models/Message');

// Get all messages for a given chat room
router.get('/:roomId/messages', async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const messages = await Message.find({ roomId });
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create a new message in a chat room
router.post('/:roomId/messages', async (req, res) => {
    try {
        const { sender, recipient, message } = req.body;
        const roomId = req.params.roomId;
        const newMessage = new Message({ sender, recipient, message, roomId });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all chat rooms for a given user
router.get('/:userId/chat-rooms', async (req, res) => {
    try {
        const userId = req.params.userId;
        const chatRooms = await ChatRoom.find({ users: { $in: [userId] } });
        res.status(200).json(chatRooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create a new chat room
router.post('/chat-rooms', async (req, res) => {
    try {
        const { name, description, users } = req.body;
        const newChatRoom = new ChatRoom({ name, description, users });
        await newChatRoom.save();
        res.status(201).json(newChatRoom);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
module.exports = router;