const { nextTick } = require('process');
const { ROLE, User, CreateData } = require('../../../../model')
const { EncriptPassword } = require('../../../../utils/bcrypt');
const { ValidateRegisterUser, CheckValidatorResult } = require('../../../../utils/validator')
const { GenerateAccessToken, GenerateRefreshToken } = require('../../../../utils/jsonwebtoken')

const signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body

        const encryptedPassword = await EncriptPassword(password)

        let option = {}
        option.data = {
            userName: username,
            email,
            password: encryptedPassword,
            profile: {
                create: { name: username || email }
            },
            // Album: {
            //     create: { title: 'Unnamed_album' }
            //   },
        }

        const result = await User.create(option)

        // create jwt token
        //use the payload to store information about the user such as username, user role, etc.
        let payload = {
            id: result.id,
            username: result.username,
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
        ValidateRegisterUser,
        CheckValidatorResult,

        // check jwt
        // if exist, user must logged out first
        /*
        function (req, res, next) {
            if (req.user) {
                throw new Error('You are currently logged-in. Please logout first.')
            }
            next()
        },
        */
        signup
    )
}