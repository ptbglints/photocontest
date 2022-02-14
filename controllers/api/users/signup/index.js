const { nextTick } = require('process');
const { ROLE, User, CreateData } = require('../../../../model')
const { EncriptPassword } = require('../../../../utils/bcrypt');
const { ValidateRegisterUser, CheckValidatorResult } = require('../../../../utils/validator')

const signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body

        const encryptedPassword = await EncriptPassword(password)

        let option = {}
        option.data = {
            username,
            email,
            password: encryptedPassword,
            profile: {
                create: { name: username || email }
            }
        }

        const result = await User.create(option)

        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}


module.exports = routes => {
    // disini sama dengan baseurl/api/users/signup
    routes.post('/',
        ValidateRegisterUser,
        CheckValidatorResult,
        signup
    )
}