const { Prisma } = require('@prisma/client')
const jwt = require("jsonwebtoken");

const HTTP_STATUS_CODE = {
    OK: 200,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500
}

const ERROR = {
    FORBIDDEN: 'Forbidden',
    NOT_FOUND: 'Not Found',
    NOT_ALLOWED: 'Not Allowed',
    JSONWEBTOKEN: 'Jwt Error',
    PRISMA: 'Prisma Error'
}

function logErrors(err, req, res, next) {
    console.error(err.stack)
    next(err)
}

function clientErrorHandler(err, req, res, next) {
    err.stack = err.stack || ''
    let status = err.status || 500
    let code = err.code || 'Unknown'
    let message = err.message || "Unknown error"
    if (message.includes(ERROR.FORBIDDEN)) {
        status = HTTP_STATUS_CODE.FORBIDDEN
    }
    if (message.includes("found")) {
        status = HTTP_STATUS_CODE.INTERNAL_SERVER
    }
    if (err instanceof jwt.JsonWebTokenError) {
        status = HTTP_STATUS_CODE.FORBIDDEN
        message = 'JsonWebTokenError. ' + message
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        code = ERROR.PRISMA
    }

    // 

    res.status(status)
    res.json({ status, code, message })
}

function errorHandler(err, req, res, next) {
    res.status(500)
    res.render('error', { error: err })
}

module.exports = {
    ERROR,
    HTTP_STATUS_CODE,
    logErrors,
    clientErrorHandler,
    errorHandler
}