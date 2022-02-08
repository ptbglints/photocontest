const { ROLE, User, CreateData } = require('../../../../model')
const { EncriptPassword } = require('../../../../utils/bcrypt');
const { ValidateRegisterUser, CheckValidatorResult } = require('../../../../utils/validator')

const signup = async (req, res) => {
    try {
        let { username, email, password, role } = req.body

        if (!ROLE.hasOwnProperty(role)) role = 'USER' // defaulted to basic role 'USER'

        const encryptedPassword = await EncriptPassword(password)

        let option = {}
        option.data = {
            username,
            email,
            password: encryptedPassword,
            role,
            profile: {
                create: { name: username || email }
            }
        }

        const result = await User.create(option)

        res.json(result)
    } catch (err) {
        console.log(err)
        code = err.code || 'Unknown'
        message = err.message || "Error occurred."
        res.status(400).json({ code, message });
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