const { ROLE, User, CreateData } = require('../../../../model')
const { EncriptPassword } = require('../../../../utils/bcrypt');
const { ValidateSignup, CheckValidatorResult } = require('../../../../middleware/validator')
const jwt = require('../../../../utils/jsonwebtoken')
const mailer = require('../../../../middleware/mailer')
const crypto = require('crypto')
const redis = require('../../../../utils/redis')

const signup = async (req, res, next) => {
    try {
        let { userName, email, password } = req.body

        // html body

        // check if user has registered but have not confirmed his email address
        await redis.del(email);
        const check = await redis.get(email)
        // if exist throw error notification
        if (check) throw new Error(check)



        const id = crypto.randomUUID()

        // prepare token object
        const tokenObj = {
            id,
            userName,
            email,
        }

        // generate tokens
        const activationToken = jwt.GenerateActivationToken(tokenObj)

        const htmlBody = `<b>Hello ${userName}, to confirm your email and activate your account, 
                please click link below:</b><br><br>
                <a href="${req.protocol}://${req.headers.host}/api/users/activate?token=${activationToken}">Confirm your email</a>`

        const redisExpireMilliSecond = parseInt(process.env.ACTIVATION_TOKEN_EXPIRE)

        await redis.set(email, htmlBody, {
            PX: redisExpireMilliSecond // expire, in millisecond
        });
        const stored = await redis.get(email);

        // send tokens using using cookies
        // https://expressjs.com/en/api.html#res.cookie
        const cookieOptionActivation = {
            httpOnly: false,
            maxAge: parseInt(process.env.ACTIVATION_TOKEN_EXPIRE),
            secure: false
        }
        res.cookie(`jwtActivation`, activationToken, cookieOptionActivation)

        // attach tokens to respond
        req.result = tokenObj
        req.result.tokenActivation = activationToken

        res.send(htmlBody)

        // next()
    } catch (err) {
        if (err.message.match(/not/i)) err.status = 401
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