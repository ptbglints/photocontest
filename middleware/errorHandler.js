const { Prisma } = require('@prisma/client')
const jwt = require("jsonwebtoken");

const HTTP_STATUS_CODE = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
}

function logErrors(err, req, res, next) {
    console.error(err)
    next(err)
}

function clientErrorHandler(err, req, res, next) {
    let status = err.status || 500
    let code = err.code || 'Unknown'
    let message = err.message || "Internal server error"
    if (message.toLowerCase().includes('bad request')) {
        status = HTTP_STATUS_CODE.BAD_REQUEST
    }
    if (message.toLowerCase().includes('forbidden')) {
        status = HTTP_STATUS_CODE.FORBIDDEN
    }
    if (message.toLowerCase().includes("found")) {
        status = HTTP_STATUS_CODE.NOT_FOUND
    }
    if (err.name === 'TokenExpiredError') {
        status = HTTP_STATUS_CODE.UNAUTHORIZED
        message = 'Token expired. Please re-login.'
    }
    if (err.name === 'JsonWebTokenError') {
        status = HTTP_STATUS_CODE.UNAUTHORIZED
        if (err.message.match(/jwt/i)) {
            const regex = /jwt/i;
            message = err.message.replace(regex, 'Token')      
        } else if (err.message.match(/invalid signature/i)) { 
            message = concat(err.message, 'Token ')
        } else {
            message = err.message
        }
    }
    if (err.name === 'NotBeforeError') {
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
    res.send({ status, code, message })
}

function errorHandler(err, req, res, next) {
    res.status(500)
    res.json({ error: err })
}

module.exports = {
    HTTP_STATUS_CODE,
    logErrors,
    clientErrorHandler,
    errorHandler
}