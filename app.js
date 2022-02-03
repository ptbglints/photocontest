const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.post(`/signup`, async (req, res) => {
  const { username, email, password } = req.body
  const result = await prisma.user.create({
    data: {
    username,
    email,
    password,
    },
  })
  res.json(result)
})

app.get(`/user/:id`, async (req, res) => {
    const result = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
          photo:true
        }
    })
    res.json(result)
  })
  app.put(`/user/:id`, async (req, res) => {
    const {id} = req.body
    const result = await prisma.user.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {id}
    })
    res.json(result)
  })



app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)