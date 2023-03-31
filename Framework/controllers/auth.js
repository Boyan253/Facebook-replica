const router = require('express').Router()
const { isUser, isGuest } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { register, login } = require('../services/user');
const { mapErrors } = require('../util/mappers');
const jwt = require('jsonwebtoken');
const { createJwt, authenticateJwt, isAuthenticated } = require('../middleware/jwt');





router.get('/register', isGuest(), (req, res) => {

    res.render('register');
})
router.post('/register', isGuest(), async (req, res) => {

    //TODO check form action, method, field names
    try {


        const user = await register(req.body.username, req.body.email, req.body.password)

        req.session.user = user
        const payload = { email: user.email, username: user.username, _id: user._id };
        const token = createJwt(payload);
        res.json({ payload: token, email: user.email, username: user.username, _id: user._id, profilePicture: user.profilePicture, friends: user.friends, createdAt: user.createdAt, updatedAt: user.updatedAt });





    } catch (err) {


        //TODO send error messages
        const errors = mapErrors(err)
        console.log(errors);


    }

})
router.get('/login', isGuest(), (req, res) => {

    res.render('login', { title: 'Login Page' });
})
//TODO check form action, method, field names

router.post('/login', isGuest(), async (req, res) => {
    try {

        const user = await login(req.body.email, req.body.password)
        const payload = { email: user.email, username: user.username, _id: user._id };
        const token = createJwt(payload);
        req.session.user = user

        res.json({ payload: token, email: user.email, username: user.username, _id: user._id, profilePicture: user.profilePicture, friends: user.friends, createdAt: user.createdAt, updatedAt: user.updatedAt });

        //TODO check redirect requirenements
    } catch (error) {
        //TODO send error messages
        const errors = mapErrors(error)
        console.log(errors);


    };

})
router.get('/logout', (req, res) => {
    isAuthenticated()
    console.log('deleted');
    res.json('logout done')



})
module.exports = router