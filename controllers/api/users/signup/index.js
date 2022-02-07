const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const signup = async(req, res) => {
    const { username, email, password } = req.body
    const result = await prisma.user.create({
        data: {
            username,
            email,
            password,
        },
    })
    res.json(result)
}


module.exports = routes => {
    // disini sama dengan baseurl/api/users/register
    routes.post('/', signup)
}