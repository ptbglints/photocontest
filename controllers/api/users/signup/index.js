const { User } = require('../../../../model')
const { EncriptPassword } = require('../../../../utils/bcrypt');

const signup = async(req, res) => {
    try {
        let { username, name, email, password, role } = req.body

        if (role) {
            role = Number(role)
        } else role = 3 // defaulted to basic user

        const encryptedPassword = await EncriptPassword(password)

        const result = await User.create({
            data: {
                username,
                name,
                email,
                password: encryptedPassword,
                role
            },
        })
        res.json(result)
    } catch (err) {
        let message = err.message || "Error occurred."
        res.status(400).send({
            message: message
        });
    }
}


module.exports = routes => {
    // disini sama dengan baseurl/api/users/register
    routes.post('/', signup)
}