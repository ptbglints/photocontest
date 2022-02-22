const { nextTick } = require('process');
const { ROLE, User, CreateData } = require('../../../../model')
const { EncriptPassword } = require('../../../../utils/bcrypt');
const { ValidateSignup, CheckValidatorResult } = require('../../../../middleware/validator')
const { GenerateAccessToken, GenerateRefreshToken } = require('../../../../utils/jsonwebtoken')

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

        const result = await User.create(option)

        // create jwt token
        //use the payload to store information about the user such as username, user role, etc.
        let payload = {
            id: result.id,
            userName: result.userName,
            role: result.role
        }

        //create the access token
        const accessToken = GenerateAccessToken(payload)

        //create the refresh token with the longer lifespan
        const refreshToken = GenerateRefreshToken(payload)

        // store the refresh token in the user array
        // user.refreshToken = refreshToken

        //send the access token to the client inside a cookie
        res.cookie("jwtAccess", accessToken, { secure: false, httpOnly: true })
        res.cookie("jwtRefresh", refreshToken, { secure: false, httpOnly: true })
        req.result = result
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