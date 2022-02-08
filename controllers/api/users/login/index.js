const { User } = require('../../../../model')
const { CheckPassword } = require('../../../../utils/bcrypt');
const { GenerateAccessToken, verifyJWT, GenerateRefreshToken } = require('../../../../middleware/authJwt')

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        let option = {}
        option.where = {
            OR: [{ username: username }, { email: username }]
        }
        const user = await User.findFirst(option) // will throw error if no record found
        const passwordIsValid = await CheckPassword(password, user.password)
        if (!passwordIsValid) return res.status(401).send('Wrong password')

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
        return res.send(user)
    } catch (err) {
        console.log(err)
        code = err.code || 'Unknown'
        message = err.message || "Error occurred."
        res.status(401).json({ code, message });
    }
}


module.exports = routes => {
    // disini sama dengan baseurl/api/users/login
    routes.post('/', login)
}