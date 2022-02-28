const { User, Album, prisma } = require('../../../../model')
const { verifyJWT } = require('../../../../middleware/authJwt');
const { randomUUID } = require('crypto');
const { ValidateCreateAlbum, CheckValidatorResult, createAlbumSchema } = require('../../../../middleware/validator');
const { modifyImagePath2ndLayer } = require('../../../../middleware/modifyImagePath');


// Search all albums whose username contain certain string
const searchManyByUsername = async (req, res, next) => {
    try {
        let { string } = req.params

        if (!string) throw new Error('Bad request. Search string is undefined')

        let option = {}
        option.where = {
            user: {
                userName: {
                    contains: string,
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
        let { string } = req.params

        let option = {}
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
    routes.get('/username/:string',
        searchManyByUsername
    )

    // Search all albums by albums's name that contain certain string
    routes.get('/title/:string',
        searchManyByAlbumTitle
    )
}
