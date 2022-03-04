const { User, Album, prisma } = require('../../../../model')
const { verifyJWT } = require('../../../../middleware/authJwt');
const { randomUUID } = require('crypto');
const { ValidateCreateAlbum, CheckValidatorResult, createAlbumSchema } = require('../../../../middleware/validator');
const { modifyImagePath2ndLayer } = require('../../../../middleware/modifyImagePath');
const winston = require('../../../../utils/winstonlogger');


// Get all albums from specific Username
const getManyBySpecificUsername = async (req, res, next) => {
    try {
        let {skip, take } = req.query
        const username = req.params.userName

        if (!skip) skip = 0
        if (!take) take = 1000

        skip = parseInt(skip)
        take = parseInt(take)

        if (take > 1000) take = 1000

        let option = {}
        option.skip = skip
        option.take = take
        option.where = {
            user: {
                userName: username
            }
        }
        option.orderBy = {
            updatedAt: 'asc'
        }
        option.include = {
            user: {
                select: { userName: true }
            }
        }
        const result = await Album.findMany(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = routes => {
    // Get all albums from specific Username
    routes.get('/:userName',
        getManyBySpecificUsername
    )

}
