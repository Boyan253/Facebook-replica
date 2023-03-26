const authController = require('../controllers/auth')
const postController = require('../controllers/post')
const chatController = require('../controllers/chat')

module.exports = (app) => {

    app.use(authController)
    app.use(postController)
    app.use(chatController)
    //other use >


    app.get('*', (req, res) => {
        res.render('404', { title: "Page not found" })
    })
}