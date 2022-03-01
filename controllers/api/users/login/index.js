const { User } = require('../../../../model')
const { CheckPassword } = require('../../../../utils/bcrypt');
const { verifyJWT } = require('../../../../middleware/authJwt');
const { GenerateTokens } = require('../../../../utils/jsonwebtoken');
const { ValidateLogin, CheckValidatorResult } = require('../../../../middleware/validator');
const { body, check, oneOf, checkSchema, validationResult } = require('express-validator');

const login = async (req, res, next) => {
    try {
        const { userName, password } = req.body
        let option = {}
        option.where = {
            OR: [{ userName: userName }, { email: userName }]
        }
        option.include = {
            profile: true
        }

        // check userName/email and password combination
        const user = await User.findFirst(option)
        if (user === null) throw new Error(`Wrong username or password`)

        const passwordIsValid = await CheckPassword(password, user.password)
        if (!passwordIsValid) throw new Error(`Wrong username or password`)

        // continue if no error
        
        // attach user detail to respond
        req.result = user

        // Generate access & refresh token
        const { accessToken, refreshToken } = GenerateTokens(user)

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
    // disini sama dengan baseurl/api/users/login
    routes.post('/',
        ValidateLogin,
        CheckValidatorResult,
        login
    )
}