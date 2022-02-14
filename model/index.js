const { PrismaClient } = require('@prisma/client')
// import the "Role" enum we declare in the schema.prisma
const { Role } = require('@prisma/client')

const globalConfig = {
    datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    errorFormat: 'minimal',
    rejectOnNotFound: true,
    log: [
        // { level: 'query', emit: 'event' },
        // { level: 'warn', emit: 'event' },
        // { level: 'info', emit: 'event' },
        // { level: 'error', emit: 'event' },
        // { level: 'query', emit: 'stdout' },
        { level: 'warn', emit: 'stdout' },
        { level: 'info', emit: 'stdout' },
        { level: 'error', emit: 'stdout' },
    ],
}

// initialize
const prisma = new PrismaClient(globalConfig)

// tables
const User = prisma.user
const Profile = prisma.profile
const Photo = prisma.photo

// event emitters
// prisma.$on('query', (e) => {
//     console.log(e)
// })
// prisma.$on('warn', (e) => {
//     console.log(e)
// })
// prisma.$on('info', (e) => {
//     console.log(e)
// })
// prisma.$on('error', (e) => {
//     console.log(e)
// })


module.exports = {
    prisma,
    ROLE: Role,
    User,
    Profile,
    Photo
}