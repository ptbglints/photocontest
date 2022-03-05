const { User } = require('../../../../model')
const { CheckPassword } = require('../../../../utils/bcrypt');
const { verifyJWT } = require('../../../../middleware/authJwt');
const jwt = require('../../../../utils/jsonwebtoken');
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
        };

        // check userName/email and password combination
        let user = await User.findFirst(option)
        if (user === null) throw new Error(`Wrong username or password`)

        const passwordIsValid = await CheckPassword(password, user.password)
        if (!passwordIsValid) throw new Error(`Wrong username or password`)

        // continue if no error
        // update lastLoginAt field
        user = await User.update({
            where: {
                email: user.email
            },
            data: {
                lastLoginAt: new Date(Date.now())
            }
        })

        // attach user detail to respond
        req.result = user

        // prepare token object
        const tokenObj = {
            id: user.id,
            userName: user.userName,
            email: user.email,
            role: user.role,
            isActive: user.isActive
        }

        // generate tokens
        const accessToken = jwt.GenerateAccessToken(tokenObj)
        const refreshToken = jwt.GenerateRefreshToken(tokenObj)

        // send tokens using using cookies
        // https://expressjs.com/en/api.html#res.cookie
        const cookieOptionAccess = {
            httpOnly: false,
            maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRE),
            secure: false
        }
        const cookieOptionRefresh = {
            httpOnly: false,
            maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRE),
            secure: false
        }
        res.cookie(`jwtAccess`, accessToken, cookieOptionAccess)
        res.cookie(`jwtRefresh`, refreshToken, cookieOptionRefresh)

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