const { canChangePassword } = require('../permission')
const { ERROR } = require('../middleware/errorHandler')

function authChangePassword(req, res, next) {
    const idToChange = parseInt(req.body.id)
    if (!canChangePassword(req.user, idToChange)) {
        throw new Error(`${ERROR.FORBIDDEN}. You are not authorized to change other user's password.`)
    }

    next()
}

module.exports = {
    authChangePassword
}