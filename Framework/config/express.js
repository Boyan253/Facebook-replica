const express = require('express')
const { create: handlebars } = require('express-handlebars')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const session = require('express-session')
const userSession = require('../middleware/userSession')
const bodyParser = require('body-parser')
module.exports = (app) => {
    app.use(cookieParser());
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(bodyParser.json())
    app.engine('.hbs', handlebars({
        extname: '.hbs'
    }).engine)
app.use(cors({
  origin: '*'
}));

    app.set('view engine', '.hbs')
    app.use('/static', express.static('static'))
    app.use(session({
        secret: 'Super Secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: "auto"
        }
    }))
    app.use(express.urlencoded({ extended: false }))
    app.use(userSession())

}
