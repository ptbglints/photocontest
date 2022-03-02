const { Prisma } = require('@prisma/client')
const jwt = require("jsonwebtoken");
const winston = require('../utils/winstonlogger');

const HTTP_STATUS_CODE = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
}

function logErrors(err, req, res, next) {
    winston.error('logErrors', err)
    next(err)
}

function clientErrorHandler(err, req, res, next) {
    winston.error('clientErrorHandler')
    let name = err.name || 'ErrorWithoutName'
    let status = err.status || 500
    let code = err.code || 'ErrorWithoutCode'
    let message = err.message || "ErrorWithoutMessage"
    if (message.match(/bad request/i)) {
        status = HTTP_STATUS_CODE.BAD_REQUEST
    }
    if (message.match(/wrong/i)) {
        status = HTTP_STATUS_CODE.UNAUTHORIZED
    }
    if (message.match(/forbid/i)) {
        status = HTTP_STATUS_CODE.UNAUTHORIZED
    }
    if (message.match(/found/i)) {
        status = HTTP_STATUS_CODE.NOT_FOUND
    }
    if (name.match(/TokenExpired/i)) {
        status = HTTP_STATUS_CODE.UNAUTHORIZED
        message = 'Token expired. Please re-login.'
    }
    if (name.match(/TokenError/i)) {
        status = HTTP_STATUS_CODE.UNAUTHORIZED
        const regex = /jwt/i;
        if (message.match(regex)) {            
            message = message.replace(regex, 'Token')
        } else if (message.match(/invalid signature/i)) {
            message = message.concat('Token ')
        } else {
            message = err.message
        }
    }
    if (name === 'NotBeforeError') {
        status = HTTP_STATUS_CODE.UNAUTHORIZED
        message = err.message
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        status = HTTP_STATUS_CODE.BAD_REQUEST
        code = err.code
        switch (code) {
            case 'P2000':
                message = `The provided value for the field ${err.meta.target} is too long.`
                break;
            case 'P2002':
                message = `${err.meta.target} already exist`
                break;
            case 'P2025':
                message = `${err.meta.cause}` // e.g. "Record to delete does not exist."
                break;
            default:
                message = err.message
        }
    }
    // catch error from validator
    if (Array.isArray(err) && err[0].msg && err[0].param) {
        let validatorErrorList = []
        for (let i = 0; i < err.length; i++) {
            validatorErrorList.push(`${err[i].param} ${err[i].msg}`)
        }
        status = HTTP_STATUS_CODE.BAD_REQUEST
        message = validatorErrorList
    }


    res.status(status)
    res.send({ status, name, code, message })
}

function lastErrorHandler(err, req, res, next) {
    winston.error(lastErrorHandler, err)
    res.status(500)
    res.json({ error: err })
}

module.exports = {
    HTTP_STATUS_CODE,
    logErrors,
    clientErrorHandler,
    lastErrorHandler
}