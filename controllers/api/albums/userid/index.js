const { User, Album, prisma } = require('../../../../model')
const { verifyJWT } = require('../../../../middleware/authJwt');
const { randomUUID } = require('crypto');
const { ValidateCreateAlbum, CheckValidatorResult, createAlbumSchema } = require('../../../../middleware/validator');
const { modifyImagePath2ndLayer } = require('../../../../middleware/modifyImagePath');
const winston = require('../../../../utils/winstonlogger');


// Get all albums from specific userId
const getManyBySpecificUserId = async (req, res, next) => {
    try {
        let {skip, take } = req.query
        const userId = req.params.userId
        console.info(req.params)

        if (!skip) skip = 0
        if (!take) take = 100

        skip = parseInt(skip)
        take = parseInt(take)

        if (take > 500) take = 500

        let option = {}
        option.skip = skip
        option.take = take
        option.where = {
            user: {
                id: userId
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
    routes.get('/:userId',
        getManyBySpecificUserId
    )
}
