const { canChangePassword } = require('../permission')
const { ERROR } = require('../middleware/errorHandler')

function authChangePassword(req, res, next) {
    const idToChange = parseInt(req.body.id)
    if (!canChangePassword(req.user, idToChange)) {
        throw new Error(ERROR.FORBIDDEN)
    }

    next()
}

module.exports = {
    authChangePassword
}