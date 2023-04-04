const mongoose = require('mongoose')
require('../models/User')

//TODO change dbname
const dbname = 'theFuture'
const connectionString = `mongodb+srv://bobosa2534:Bandarara0506@cluster0.lh5vqlc.mongodb.net/?retryWrites=true&w=majority`

module.exports = async (app) => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('Database connected');

        mongoose.connection.on('error', (err) => {
            console.error('Database error')
            console.error(err);
        })
    } catch (error) {
        console.error('Error connecting to database')
        console.error(error);
        process.exit(1)
    }

}
