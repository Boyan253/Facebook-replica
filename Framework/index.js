const express = require('express')
const expressConfig = require('./config/express')
const databaseConfig = require("./config/database")
const routesConfig = require('./config/routes')
const bodyParser = require('body-parser');
const Message = require('./models/Message');
const cors = require('cors')
start()

async function start() {
    const app = express()



    expressConfig(app)
    await databaseConfig(app)
    routesConfig(app)

    const http = require('http').createServer(app);
    const PORT = 3005;


    //New imports

    app.use(cors())

    app.use(bodyParser.json())



    //not needed now
    // app.post('/messages', async (req, res) => {
    //     console.log(req.body);
    //     const { name, text } = req.body;

    //     try {
    //         const newMessage = new Message({
    //             username: name,
    //             message: text
    //         });
    //         await newMessage.save();
    //         res.json(newMessage);
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).send('Server Error');
    //     }
    // });


    const socketIO = require('socket.io')(http, {
        cors: {
            origin: "http://localhost:3000"
        }
    });

    //Add this before the app.get() block
    let users = [];

    //Connect to MongoDB




    socketIO.on('connection', (socket) => {
        socket.on('message', async (data) => {

            
            const message = new Message({
                username: data.name,
                message: data.text
            });
            await message.save();

            socketIO.emit('messageResponse', data);
        });


        socket.on('newUser', (data) => {
    
            const userExists = users.some((user) => user.email === data.email);
        
            if (userExists) {
                //  active users back to the client
                socketIO.emit('newUserResponse', users);
            } else {
                
                const newUser = { ...data, id: socket.id };
                users.push(newUser);
                socketIO.emit('newUserResponse', users);
            }
            console.log(users);
        });
        
        
        socket.on('user-disconnect', (userId) => {
            console.log(`User with ID ${userId} has disconnected`);
          
            users = users.filter((user) => user.id !== userId);
          
            socketIO.emit('newUserResponse', users);
          });
          
    });

    app.get('/messages', async (req, res) => {
        try {
            const messages = await Message.find();
            res.json(messages);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    });

    http.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });
}
