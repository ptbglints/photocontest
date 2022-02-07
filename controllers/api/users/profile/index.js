const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()



const getProfile = async(req, res) => {
    console.log(req.params)

    const result = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        // include: {
        //     photo: true
        // }
    })
    res.json(result)
}

const updateProfile = async(req, res) => {
    const { id } = req.body
    const result = await prisma.user.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: { id }
    })
    res.json(result)
}

module.exports = routes => {
    // disini sama dengan baseurl/api/users/profile/:id
    /**
     * This api getting the user profile by id
     * @route GET /api/users/profile/{id}
     * @group user - get user
     * @param {string} id.param.required - id of user
     * @returns {object} 200 - An array of user info
     * @returns {Error}  default - Unexpected error
     */
    routes.get('/:id', getProfile);
    /**
     * This api updating the user profile by id
     * @route PUT /api/users/profile/{id}
     * @group user - update user
     * @param {string} id.param.required - id of user
     * @param {object} body.required - payload of user
     * @returns {object} 200 - An array of user info
     * @returns {Error} default - Unexpected error
     */
    routes.put('/:id', updateProfile);
}