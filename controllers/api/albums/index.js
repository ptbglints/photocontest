const { Album } = require('../../../model')
const { verifyJWT } = require('../../../middleware/authJwt');
const { randomUUID } = require('crypto');
const { ValidateCreateAlbum, CheckValidatorResult, createAlbumSchema } = require('../../../middleware/validator');
const { modifyImagePath2ndLayer } = require('../../../middleware/modifyImagePath');

// Create an album
const createOne = async (req, res, next) => {
    try {
        const { title, isPrivate, isDownloadable } = req.body
        const id = req.user.id
        let option = {}
        option.data = {
            id: randomUUID(),
            title: title,
            user: {
                connect: { id: id }
            },
            isPrivate: SANITIZE.toBoolean(isPrivate),
            isDownloadable: SANITIZE.toBoolean(isDownloadable)
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

        if (!skip) skip = 0
        if (!take) take = 100

        skip = parseInt(skip)
        take = parseInt(take)

        if (take > 100) take = 100

        let option = {}
        option.skip = skip
        option.take = take
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

// Get all albums from specific userId
const getManyBySpecificUserId = async (req, res, next) => {
    try {
        let {skip, take } = req.query
        const userId = req.params.userId

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
        const profile = result.user.profile
        delete result['user'];
        result.profile = profile
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

    // Create an album
    routes.post('/',
        verifyJWT,
        ValidateCreateAlbum,
        CheckValidatorResult,
        createOne
    )

    // Get all albums in the database, with skip and take query, ordered by createdAt
    routes.get('/',
        getManyWithQuery
    )

    // Get all albums from specific userId
    routes.get('/userid/:userId',
        getManyBySpecificUserId
    )


    // Get all albums from specific Username
    routes.get('/username/:userName',
        getManyBySpecificUsername
    )


    // Get a specific album by album id, include its photos
    routes.get('/id/:albumId',
        getSingleAlbumByAlbumId,
        modifyImagePath2ndLayer
    )

    // Update detail of specific album, by album Id
    routes.put('/',
        verifyJWT,
        updateSingleAlbumDetailByAlbumId
    )
}

