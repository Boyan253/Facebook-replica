const mongoose = require('mongoose')
require('../models/User')

//TODO change dbname
const dbname = 'theFuture'
const connectionString = `mongodb://127.0.0.1:27017/${dbname}`

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
        console.error('Error  connecting to database')
        console.error(error);
        process.exit(1)
    }

}