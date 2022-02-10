const { User } = require('../../../../model')
const { CheckPassword } = require('../../../../utils/bcrypt');
const { GenerateAccessToken, verifyJWT, GenerateRefreshToken } = require('../../../../middleware/authJwt')

const login = async (req, res) => {
    // console.log(req.body)
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

    /**
     * @swagger
     *  /api/users/login:
     *   post:
     *     tags:
     *       - Users
     *     summary: User login
     *     requestBody:
     *       description: A JSON object containing login credentials
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - username
     *               - password
     *             properties:
     *               username:
     *                 type: string
     *                 example: jhonyboy
     *               password:
     *                 type: string
     *                 example: Password2?
     *     responses:
     *       "200":
     *         description: Corporate org structure for a client
     */
    routes.post('/', login)

    // post:
    //   summary: Creates a new user.
    //   consumes:
    //     - application/json
    //   parameters:
    //     - in: body
    //       name: user
    //       description: The user to create.
    //       schema:
    //         type: object
    //         required:
    //           - userName
    //         properties:
    //           userName:
    //             type: string
    //           firstName:
    //             type: string
    //           lastName:
    //             type: string
}