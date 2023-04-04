const authController = require('../controllers/auth')
const postController = require('../controllers/post')
const chatController = require('../controllers/chat')
const userController = require('../controllers/user')

module.exports = (app) => {

    app.use(authController)
    app.use(postController)
    app.use(chatController)
    app.use(userController)

    //other use >


    app.get('*', (req, res) => {
        res.render('404', { title: "Page not found" })
    })
}