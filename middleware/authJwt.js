const jwt = require("jsonwebtoken");

function GenerateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE
    })
}

function GenerateRefreshToken(payload) {
    return  jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE
    })
}

const verifyJWT = function (req, res, next) {
    try {
        let accessToken
        if (req.headers['authorization']) {
            const authHeader = req.headers['authorization']
            accessToken = authHeader && authHeader.split(' ')[1]
        } else {
            accessToken = req.cookies.jwtAccess
        }

        //if there is no token stored in cookies, the request is unauthorized
        if (!accessToken || accessToken == null) {
            return res.status(403).send('jwt not found')
        }

        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        let decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        console.log({ JWT: decoded, expireIn: `${decoded.exp - Math.floor(Date.now() / 1000)} second` })
        // console.log(decoded.exp-decoded.iat)

        // attach user info to req
        req.user = decoded

        next()
    }
    catch (err) {
        //if an error occured return request unauthorized error
        console.log(err)
        let message = err.message || "Error occurred."
        return res.status(401).send({
            message: message
        });
    }
}

const refreshJWT = function (req, res) {

    let accessToken = req.cookies.jwtAccess
    let refreshToken = req.cookies.jwtRefresh

    if (!accessToken || !refreshToken) {
        return res.status(403).send('jwt not found')
    }

    let decoded
    try {
        decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    }
    catch (err) {
        console.log(err)
        let message = err.message || "Error occurred."
        res.status(401).json({
            message: message
        });
    }

    let tokenLife
    let containLetter
    //create the access token with the shorter lifespan
    tokenLife = process.env.ACCESS_TOKEN_EXPIRE
    containLetter = isNaN(Number(tokenLife))
    if (!containLetter) tokenLife = parseInt(tokenLife)

    let newToken = jwt.sign(decoded, tokenLife,
        {
            algorithm: "HS256",
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE
        })

    res.cookie("jwt", newToken, { secure: false, httpOnly: true })
    res.send()
}

module.exports = {
    GenerateAccessToken,
    GenerateRefreshToken,
    verifyJWT,
    refreshJWT
}