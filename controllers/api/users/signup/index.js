const { ROLE, User, CreateData } = require('../../../../model')
const { EncriptPassword } = require('../../../../utils/bcrypt');
const { ValidateSignup, CheckValidatorResult } = require('../../../../middleware/validator')
const { GenerateTokens } = require('../../../../utils/jsonwebtoken')

const signup = async (req, res, next) => {
    try {
        let { userName, email, password } = req.body

        const encryptedPassword = await EncriptPassword(password)

        let option = {}
        option.data = {
            userName,
            email,
            password: encryptedPassword,
            profile: {
                create: { name: userName || email }
            },
        }
        option.include = {
            profile: true
        }

        // create user
        const createdUser = await User.create(option)

        // attach user detail to respond
        req.result = createdUser

        // continue if no error
        // Generate access & refresh token
        const { accessToken, refreshToken } = GenerateTokens(createdUser)

        // send tokens using using cookies
        // https://expressjs.com/en/api.html#res.cookie
        const cookieOption = {
            httpOnly: false,
            maxAge: 6 * 3600 * 1000, // 6Hr
            secure: false
        }
        res.cookie(`jwtAccess`, accessToken, cookieOption)
        res.cookie(`jwtRefresh`, refreshToken, cookieOption)

        // attach tokens to respond
        req.result.token = accessToken
        req.result.tokenRefresh = refreshToken

        next()
    } catch (err) {
        next(err)
    }
}


module.exports = routes => {
    // disini sama dengan baseurl/api/users/signup
    routes.post('/',
        ValidateSignup,
        CheckValidatorResult,
        signup
    )
}