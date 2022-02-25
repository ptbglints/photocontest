const { User, Album, prisma } = require('../../../../model')
const { verifyJWT } = require('../../../../middleware/authJwt');
const { randomUUID } = require('crypto');
const { ValidateCreateAlbum, CheckValidatorResult, createAlbumSchema } = require('../../../../middleware/validator');
const { modifyImagePath2ndLayer } = require('../../../../middleware/modifyImagePath');


// Search all albums whose username contain certain string
const searchManyByUsername = async (req, res, next) => {
    try {
        let { username, skip, take } = req.query
        let option = {}
        option.skip = skip = parseInt(skip)
        option.take = take = parseInt(take)
        option.where = {
            user: {
                userName: {
                    contains: username,
                }
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

// Search all albums by albums's name that contain certain string
const searchManyByAlbumTitle = async (req, res, next) => {
    try {
        let { string, skip, take } = req.query
        skip = parseInt(skip)
        take = parseInt(take)

        let option = {}
        option.skip = skip
        option.take = take
        option.where = {
            title: {
                contains: string,
                mode: 'insensitive'
            }
        }
        option.orderBy = {
            updatedAt: 'asc'
        }
        const result = await Album.findMany(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = routes => {
    // disini sama dengan baseurl/api/albums/search/

    // Search all albums whose username contain certain string
    routes.get('/username',
        searchManyByUsername
    )

    // Search all albums by albums's name that contain certain string
    routes.get('/title',
        searchManyByAlbumTitle
    )
}
