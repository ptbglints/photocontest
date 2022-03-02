const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
let accesTokenExpire = process.env.ACCESS_TOKEN_EXPIRE
let refreshTokenExpire = process.env.REFRESH_TOKEN_EXPIRE

// if token expire does not contain any letter n, h etc.
// then convert to integer
if (!isNaN(Number(accesTokenExpire))) accesTokenExpire = parseInt(accesTokenExpire)
if (!isNaN(Number(refreshTokenExpire))) refreshTokenExpire = parseInt(refreshTokenExpire)

// function to generate accessToken and refreshToken
const GenerateTokens = (userObj) => {
    let tokenObj = {
        id: userObj.id.toString(),
        userName: userObj.userName,
        email: userObj.email,
        role: userObj.role
    }

    const accessToken = jwt.sign(tokenObj, accessTokenSecret, {
        algorithm: "HS256",
        expiresIn: accesTokenExpire
    })

    const refreshToken = jwt.sign(tokenObj, refreshTokenSecret, {
        algorithm: "HS256",
        expiresIn: refreshTokenExpire
    })

    return { accessToken, refreshToken }
}

const verifyToken = (str, token) => {
    const secret = str.match(/access/i) ? accessTokenSecret : refreshTokenSecret
    return jwt.verify(token, secret, function (err, decoded) {
        if (err) throw err
        return decoded
    })
}

module.exports = {
    GenerateTokens,
    verifyToken,
} 
