const { User } = require('../../../../model')
const { CheckPassword } = require('../../../../utils/bcrypt');
const { verifyJWT } = require('../../../../middleware/authJwt');
const { GenerateAccessToken, GenerateRefreshToken } = require('../../../../utils/jsonwebtoken');
const { ValidateLogin, CheckValidatorResult } = require('../../../../middleware/validator');
const { body, check, oneOf, checkSchema, validationResult } = require('express-validator');

const login = async (req, res, next) => {
    // console.log(req.body)
    try {
        const { username, password } = req.body
        console.log(username)
        let option = {}
        option.where = {
            OR: [{ userName: username }, { email: username }]
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
            username: user.userName,
            role: user.role
        }

        //create the access token
        const accessToken = GenerateAccessToken(payload)

        //create the refresh token with the longer lifespan
        const refreshToken = GenerateRefreshToken(payload)

        // store the refresh token in the user array
        // user.refreshToken = refreshToken

        //send the access token to the client inside a cookie
        res.cookie("jwtAccess", accessToken, { secure: false, httpOnly: false })
        res.cookie("jwtRefresh", refreshToken, { secure: false, httpOnly: false })
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