const jwt = require("jsonwebtoken");
const ms = require('ms')

//  Sanitize EXPIRE from string to integer
// see https://github.com/vercel/ms
if (isNaN(Number(process.env.ACCESS_TOKEN_EXPIRE)))
    process.env.ACCESS_TOKEN_EXPIRE = ms(process.env.ACCESS_TOKEN_EXPIRE)
if (isNaN(Number(process.env.REFRESH_TOKEN_EXPIRE)))
    process.env.REFRESH_TOKEN_EXPIRE = ms(process.env.REFRESH_TOKEN_EXPIRE)
if (isNaN(Number(process.env.ACTIVATION_TOKEN_EXPIRE)))
    process.env.ACTIVATION_TOKEN_EXPIRE = ms(process.env.ACTIVATION_TOKEN_EXPIRE)

let accessSecret = process.env.ACCESS_TOKEN_SECRET
let accesExpire = process.env.ACCESS_TOKEN_EXPIRE

let refreshSecret = process.env.REFRESH_TOKEN_SECRET
let refreshExpire = process.env.REFRESH_TOKEN_EXPIRE

let activationSecret = process.env.ACTIVATION_TOKEN_SECRET
let activationExpire = process.env.ACTIVATION_TOKEN_EXPIRE

console.log(accesExpire, refreshExpire, activationExpire)

const GenerateAccessToken = (obj) => {
    return jwt.sign(obj, accessSecret, {
        algorithm: 'HS256',
        expiresIn: accesExpire,
        subject: 'access'
    })
}

const GenerateRefreshToken = (obj) => {
    return jwt.sign(obj, refreshSecret, {
        algorithm: 'HS256',
        expiresIn: refreshExpire,
        subject: 'refresh'
    })
}

const GenerateActivationToken = (obj) => {
    return jwt.sign(obj, activationSecret, {
        algorithm: "HS256",
        expiresIn: activationExpire,
        subject: 'activation'
    })
}

const verifyAccessToken = (token) => {
    return jwt.verify(token, accessSecret, function (err, decoded) {
        if (err) throw err
        return decoded
    })
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, refreshSecret, function (err, decoded) {
        if (err) throw err
        return decoded
    })
}

const verifyActivationToken = (token) => {
    return jwt.verify(token, activationSecret, function (err, decoded) {
        if (err) throw err
        return decoded
    })
}

module.exports = {
    GenerateAccessToken,
    GenerateRefreshToken,
    GenerateActivationToken,
    verifyAccessToken,
    verifyRefreshToken,
    verifyActivationToken
} 
