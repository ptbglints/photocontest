const { Album } = require('../../../model')
const { verifyJWT } = require('../../../middleware/authJwt');
const { randomUUID } = require('crypto');
const { ValidateCreateAlbum, CheckValidatorResult, createAlbumSchema } = require('../../../middleware/validator');
const { modifyImagePath2ndLayer } = require('../../../middleware/modifyImagePath');
const { generateSlug, totalUniqueSlugs } = require("random-word-slugs");

// Create an album
const createOne = async (req, res, next) => {
    try {
        const { title, description, coverPhotoId, isPrivate, isDownloadable } = req.body
        const id = req.user.id
        let option = {}
        option.data = {
            id: randomUUID(),
            title: title,
            description: description? description : generateSlug(10, { format: "sentence" }),
            coverPhotoId: coverPhotoId? coverPhotoId :  'defaultAlbumCover',
            user: {
                connect: { id: id }
            },
            isPrivate: isPrivate? isPrivate: false,
            isDownloadable: isDownloadable? isDownloadable: true
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

    // Update detail of specific album, by album Id
    routes.put('/',
        verifyJWT,
        updateSingleAlbumDetailByAlbumId
    )
}

