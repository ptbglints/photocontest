const { User } = require('../../../../model')
const { CheckPassword } = require('../../../../utils/bcrypt');
const { verifyJWT } = require('../../../../middleware/authJwt');
const jwt = require('../../../../utils/jsonwebtoken');
const { ValidateLogin, CheckValidatorResult } = require('../../../../middleware/validator');
const { body, check, oneOf, checkSchema, validationResult } = require('express-validator');

const activate = async (req, res, next) => {
    try {
        const { token } = req.query

        // this will throw error if token is invalid
        const decoded = jwt.verifyActivationToken(token)

        // continue if no error
        let option = {}
        option.where = {
            userName: decoded.userName
        }
        option.data = {
            isActive: true,
            lastLoginAt: new Date(Date.now())
        };

        // toggle isActive to 'true'
        let user = await User.update(option)
        let message; 
        // throw error if not found       
        if (user === null) {
            message = `User not found or token is expired/invalid`
            throw new Error(message)
        }
        // respond if no error
        message = 'Your account has been activated. Please re-login.'
        res.send(message)
    } catch (err) {
        next(err)
    }
}


module.exports = routes => {
    // disini sama dengan baseurl/api/users/activate
    routes.get('/',
        activate
    )
}