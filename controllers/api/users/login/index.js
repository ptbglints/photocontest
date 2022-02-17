const { User } = require('../../../../model')
const { CheckPassword } = require('../../../../utils/bcrypt');
const { verifyJWT } = require('../../../../middleware/authJwt');
const { GenerateAccessToken, GenerateRefreshToken } = require('../../../../utils/jsonwebtoken')
const { ERROR } = require('../../../../middleware/errorHandler');

const login = async (req, res, next) => {
    // console.log(req.body)
    try {
        const { username, password } = req.body
        let option = {}
        option.where = {
            OR: [{ userName: username }, { email: username }]
        }
        const user = await User.findFirst(option) // will throw error if no record found
        const passwordIsValid = await CheckPassword(password, user.password)

        if (!passwordIsValid) {
            throw new Error(`${ERROR.FORBIDDEN}. Wrong password`)
        }

        //use the payload to store information about the user such as username, user role, etc.
        let payload = {
            id: user.id,
            username: user.username,
            role: user.role
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
        req.result = user
        next()
    } catch (err) {
        next(err)
    }
}


module.exports = routes => {
    // disini sama dengan baseurl/api/users/login
    routes.post('/', login)
}