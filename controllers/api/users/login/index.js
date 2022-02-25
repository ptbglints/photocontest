const { User } = require('../../../../model')
const { CheckPassword } = require('../../../../utils/bcrypt');
const { verifyJWT } = require('../../../../middleware/authJwt');
const { GenerateAccessToken, GenerateRefreshToken } = require('../../../../utils/jsonwebtoken');
const { ValidateLogin, CheckValidatorResult } = require('../../../../middleware/validator');
const { body, check, oneOf, checkSchema, validationResult } = require('express-validator');

const login = async (req, res, next) => {
    // console.log(req.body)
    try {
        const { userName, password } = req.body
        let option = {}
        option.where = {
            OR: [{ userName: userName }, { email: userName }]
        }
        option.include = {
            profile: true
        }
        const user = await User.findFirst(option) // will throw error if no record found
        const passwordIsValid = await CheckPassword(password, user.password)

        if (!passwordIsValid) {
            throw new Error(`Forbidden. Wrong password`)
        }

        //use the payload to store information about the user such as username, user role, etc.
        let payload = {
            id: user.id,
            userName: user.userName,
            role: user.role
        }

        //create the access token
        const accessToken = GenerateAccessToken(payload)

        //create the refresh token with the longer lifespan
        const refreshToken = GenerateRefreshToken(payload)

        // store the refresh token in the user array
        // user.refreshToken = refreshToken

        //send the access token to the client inside a cookie
        // https://expressjs.com/en/api.html#res.cookie
        const cookieOption = {
            httpOnly: false,
            maxAge: 6 * 3600 * 1000, // 6Hr
            secure: false
        }
        res.cookie(`${userName}_jwtAccess`, accessToken, cookieOption)
        res.cookie(`${userName}_jwtRefresh`, refreshToken, cookieOption)
        req.result = user
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