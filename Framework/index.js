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
            origin: "www.thefuture.com"
        }
    });

    //Add this before the app.get() block
    let users = [];

    //Connect to MongoDB




    socketIO.on('connection', (socket) => {
        socket.on('message', async (data) => {

            //Save the message to the database
            const message = new Message({
                username: data.name,
                message: data.text
            });
            await message.save();

            socketIO.emit('messageResponse', data);
        });

        //Listens when a new user joins the server
        socket.on('newUser', (data) => {
            //Adds the new user to the list of users
            users.push(data);

            socketIO.emit('newUserResponse', users);
        });

        socket.on('user-disconnect', () => {
            console.log('🔥: A user disconnected');

            users = users.filter((user) => user.socketID !== socket.id);
            // console.log(users);

            socketIO.emit('newUserResponse', users);
            socket.disconnect();
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
