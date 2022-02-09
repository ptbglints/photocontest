const { User } = require('../../../../model')
const { verifyJWT } = require('../../../../middleware/authJwt')
const { ValidatePassword, CheckValidatorResult } = require('../../../../utils/validator')
const { EncriptPassword } = require('../../../../utils/bcrypt');

const changePassword = async (req, res) => {
    try {
        const {id, password} = req.body
        const newPassword = req.body.password
        const whoseId = id
        const newEncryptedPassword = await EncriptPassword(newPassword)
        let option = {}
        option.where = {id: whoseId}
        option.data = {password: newEncryptedPassword}
        const result = await User.update(option)
        res.json(result)
    } catch (err) {
        console.log(err)
        code = err.code || 'Unknown'
        message = err.message || "Error occurred."
        res.status(400).json({ code, message });
    }
}

module.exports = routes => {
    // disini sama dengan baseurl/api/users/password
    routes.put('/',
        verifyJWT,
        ValidatePassword,
        CheckValidatorResult,
        changePassword
    )
}