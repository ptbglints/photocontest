const {User} = require('../../../model')

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body
        await User.create({
            data: {
                username,
                email,
                password,
            },
        })
        res.json(result)
    } catch (err) {
        res.status(400).send({
            message:
                err.message || "Some error occurred while retrieving users."
        });
    }
}


module.exports = routes => {
    // disini sama dengan baseurl/api/users/register
    routes.post('/', signup)
}