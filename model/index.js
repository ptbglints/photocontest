const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({
    errorFormat: 'minimal',
})

const User = prisma.user
const Photo = prisma.photo
const Contest = prisma.contest

const GetAllData = async (dbTable) => {
    return await dbTable.findMany()
}

const GetOneDataById = async (dbTable, id) => {
    return await dbTable.findUnique({
        where: {id:id}
    })
}

const DeleteDataById = async (dbTable, id) => {
    return await dbTable.delete({
        where: {id:id}
    })
}

module.exports = {
    User,
    Photo,
    Contest,
    GetAllData,
    GetOneDataById,
    DeleteDataById
}