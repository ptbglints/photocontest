const jwt = require("jsonwebtoken");

const GenerateTokens = (userObj) => {
    let tokenObj = {
        id: userObj.id.toString(),
        userName: userObj.userName,
        email: userObj.email,
        role: userObj.role
    }
    const accessToken = jwt.sign(tokenObj, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE
    })
    const refreshToken = jwt.sign(tokenObj, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE
    })
    return { accessToken, refreshToken }
}

module.exports = {
    GenerateTokens
} 
