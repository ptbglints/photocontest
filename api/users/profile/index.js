const prisma = new PrismaClient()

const getProfile = async(req, res) => {
    const result = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            photo: true
        }
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

    routes.get('/:id', getProfile);
    routes.put('/:id', updateProfile);
}