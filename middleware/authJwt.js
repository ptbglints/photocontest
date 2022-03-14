const jwt = require('../utils/jsonwebtoken');

const verifyJWT = function async(req, res, next) {
    try {
        const accessToken = (function () {
            // check if token is in header
            if (req.headers['authorization']) {
                const authHeader = req.headers['authorization']
                return authHeader && authHeader.split(' ')[1]
            }
            // check if token is in query
            if (req.query && req.query.token) {
                return req.query.token;
            }
            // check if token is in cookie
            if (req.cookies && req.cookies.jwtAccess) {
                return req.cookies.jwtAccess
            }
        })();

        // verify JWT
        const decoded = jwt.verifyAccessToken(accessToken)

        // attach decoded token to request as object 'user'
        req.user = decoded;

        next()

    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    verifyJWT
}