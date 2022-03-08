const { User, Album, prisma } = require('../../../../model')
const { verifyJWT } = require('../../../../middleware/authJwt');
const { randomUUID } = require('crypto');
const { ValidateCreateAlbum, CheckValidatorResult, createAlbumSchema } = require('../../../../middleware/validator');
const { modifyImagePath2ndLayer } = require('../../../../middleware/modifyImagePath');
const winston = require('../../../../utils/winstonlogger');


// Get a specific album by album id, include its photos 
const getSingleAlbumByAlbumId = async (req, res, next) => {
    try {
        const albumId = req.params.albumId
        let option = {}
        option.where = {
            id: albumId
        }

        option.include = {
            photos: true,
            user: {
                select: {
                    profile: true
                }
            }
        }

        const result = await Album.findUnique(option)

        if (!result) throw new Error ('No Album found.')

        const profile = result.user.profile
        delete result['user'];
        result.profile = profile
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = routes => {
    // Get a specific album by album id, include its photos
    routes.get('/:albumId',
        getSingleAlbumByAlbumId,
        modifyImagePath2ndLayer
    )

}
