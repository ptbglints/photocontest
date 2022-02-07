const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({
    errorFormat: 'minimal',
})

const User = prisma.user
const Photo = prisma.photo
const Contest = prisma.contest

module.exports = {
    User,
    Photo,
    Contest
}