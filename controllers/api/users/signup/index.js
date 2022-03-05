const { ROLE, User, CreateData } = require('../../../../model')
const { EncriptPassword } = require('../../../../utils/bcrypt');
const { ValidateSignup, CheckValidatorResult } = require('../../../../middleware/validator')
const jwt = require('../../../../utils/jsonwebtoken')
const mailer = require('../../../../middleware/mailer')

const signup = async (req, res, next) => {
    try {
        let { userName, email, password } = req.body

        const encryptedPassword = await EncriptPassword(password)

        // generate custom avatar
        // see https://avatars.dicebear.com/docs/http-api

        const sprites = [
            'male', 'female', 'human', 'identicon', 'initials',
            'bottts', 'avataaars', 'jdenticon', 'gridy', 'micah'
        ]

        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
        }

        const sprite = sprites[getRandomIntInclusive(0, sprites.length-1)]
        const profilePhotoUrl = `https://avatars.dicebear.com/api/${sprite}/${userName || email}.svg`

        const coverPhotoUrl = 'https://picsum.photos/seed/picsum/800/300'

        let option = {}
        option.data = {
            userName,
            email,
            password: encryptedPassword,
            profile: {
                create: {
                    name: userName || email,
                    profilePhoto: profilePhotoUrl,
                    coverPhoto: coverPhotoUrl
                }
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
        // Generate activation

        // prepare token object
        const tokenObj = {
            id: createdUser.id,
            userName: createdUser.userName,
            email: createdUser.email,
            role: createdUser.role,
            isActive: createdUser.isActive
        }

        // generate tokens
        const accessToken = jwt.GenerateAccessToken(tokenObj)
        const refreshToken = jwt.GenerateRefreshToken(tokenObj)
        const activationToken = jwt.GenerateActivationToken(tokenObj)

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
        const cookieOptionActivation = {
            httpOnly: false,
            maxAge: parseInt(process.env.ACTIVATION_TOKEN_EXPIRE),
            secure: false
        }
        res.cookie(`jwtAccess`, accessToken, cookieOptionAccess)
        res.cookie(`jwtRefresh`, refreshToken, cookieOptionRefresh)
        res.cookie(`jwtActivation`, activationToken, cookieOptionActivation)

        // attach tokens to respond
        req.result.token = accessToken
        req.result.tokenRefresh = refreshToken
        req.result.tokenActivation = activationToken

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
        signup,
        mailer.sendConfirmMail

    )
}