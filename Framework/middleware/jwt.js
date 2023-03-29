const jwt = require('jsonwebtoken');
const secret = 'My_Secret_Secret'
function isAuthenticated() {
    return function (req, res, next) {
        const token = JSON.stringify(req.headers.authorization)
        if (token) {
            try {
                const decodedToken = jwt.verify(token, secret);
                return true

            } catch (error) {
                console.error(error);
                return false
            }
        } else {
            res.status(401)
            return false
        }
    }
}
function authenticateJwt(req, res, next) {
    const token = JSON.stringify(req.headers.authorization)

    if (token) {
        try {
            const decodedToken = jwt.verify(token, secret);
            return true

        } catch (error) {
            console.error(error);
            return false
        }
    } else {
        res.status(401)
        return false
    }
}
function createJwt(payload) {
    const options = { expiresIn: '1h' };
    const token = jwt.sign(payload, secret, options);
    return token;
}

module.exports = { isAuthenticated, authenticateJwt, createJwt }





