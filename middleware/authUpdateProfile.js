const { canUpdateProfile } = require('../permission')
const { ERROR } = require('../middleware/errorHandler')

function authChangeProfile(req, res, next) {
    const idToChange = parseInt(req.body.id)
    if (!canUpdateProfile(req.user, idToChange)) {
        throw new Error(`${ERROR.FORBIDDEN}. You are not authorized to change other user's profile.`)
    }

    next()
}

module.exports = {
    authChangeProfile
}