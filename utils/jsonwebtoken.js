const jwt = require("jsonwebtoken");

exports.GenerateAccessToken = payload => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE
    })
}

exports.GenerateRefreshToken = payload => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE
    })
}