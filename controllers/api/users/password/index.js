const { ROLE, User } = require('../../../../model')
const { verifyJWT } = require('../../../../middleware/authJwt')
const { ValidatePassword, CheckValidatorResult } = require('../../../../utils/validator')
const { authChangePassword } = require('../../../../middleware/authChangePassword')
const { EncriptPassword } = require('../../../../utils/bcrypt');

const changePassword = async (req, res, next) => {
    try {
        const { id, password } = req.body
        const newPassword = req.body.password
        const whoseId = parseInt(id)
        const newEncryptedPassword = await EncriptPassword(newPassword)
        let option = {}
        option.where = { id: whoseId }
        option.data = { password: newEncryptedPassword }
        const result = await User.update(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = routes => {
    // disini sama dengan baseurl/api/users/password
    routes.put('/',
        verifyJWT,
        ValidatePassword,
        CheckValidatorResult,
        authChangePassword,
        changePassword
    )
}