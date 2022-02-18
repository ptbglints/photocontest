const { Album } = require('../../../model')
const { verifyJWT } = require('../../../middleware/authJwt');
const { randomUUID } = require('crypto');

// Create an album
const createOne = async (req, res, next) => {
    try {
        const { title } = req.body
        const id = req.user.id
        let option = {}
        option.data = {
            id: randomUUID(),
            title: title,
            user: {
                connect: { id: id }
            }
        }
        const result = await Album.create(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

// Get all albums in the database, with skip and take query, ordered by createdAt
const getManyWithQuery = async (req, res, next) => {
    try {
        let { skip, take } = req.query

        let option = {}
        option.skip = parseInt(skip)
        option.take = parseInt(take)
        option.orderBy = {
            updatedAt: 'asc'
        }
        option.include = {
            photos: true
        }
        const result = await Album.findMany(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

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
        const result = await Album.findMany(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

// Get all albums from specific Username
const getManyBySpecificUsername = async (req, res, next) => {
    try {
        let { username, skip, take } = req.query
        skip = parseInt(skip)
        take = parseInt(take)

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
                contains: string
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


// Get a specific album by album id, include its photos 
const getSingleAlbumByAlbumId = async (req, res, next) => {
    try {
        const albumId = req.params.albumId
        let option = {}
        option.where = {
            id: albumId
        }
        option.include = {
            photos: true
        }
        const result = await Album.findUnique(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

// Update detail of specific album, by album Id
const updateSingleAlbumDetailByAlbumId = async (req, res, next) => {
    try {
        const {
            albumId,
            title,
            description,
            coverPhotoId,
            isPrivate,
            isDownloadable,
         } = req.body

        let option = {}
        option.where = {
            id: albumId
        }
        option.data = {
            title,
            description,
            coverPhotoId,
            isPrivate,
            isDownloadable,
            updatedAt: new Date(Date.now())
        }
        const result = await Album.update(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = routes => {
    // disini sama dengan baseurl/api/albums/
    routes.post('/',
        verifyJWT,
        createOne
    )

    routes.get('/',
        getManyWithQuery
    )

    routes.get('/username/search',
        searchManyByUsername
    )

    routes.get('/username/',
        getManyBySpecificUsername
    )

    routes.get('/title/search',
        searchManyByAlbumTitle
    )

    routes.get('/:albumId',
        getSingleAlbumByAlbumId
    )

    routes.put('/',
        verifyJWT,
        updateSingleAlbumDetailByAlbumId
    )

}

