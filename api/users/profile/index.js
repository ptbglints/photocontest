const {User} = require('../../../model')

const getProfile = async(req, res) => {
    try {
        const result = await User.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                photo: true
            }
        })
        res.json(result)
    } catch (err) {
        res.status(400).send({
            message:
                err.message || "Some error occurred while retrieving users."
        });
    }
}
const updateProfile = async(req, res) => {
    try {
        const { id } = req.body
        const result = await User.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: { id }
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
    // disini sama dengan baseurl/api/users/profile/:id

    routes.get('/:id', getProfile);
    routes.put('/:id', updateProfile);
}