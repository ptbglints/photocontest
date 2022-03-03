const { Photo, User, prisma } = require('../../../model')
const { verifyJWT } = require('../../../middleware/authJwt')
const uploadPhoto = require('../../../middleware/uploadPhoto')
const { modifyImagePath } = require('../../../middleware/modifyImagePath')
const { generateSlug, totalUniqueSlugs } = require("random-word-slugs");

// helper function
/* Parse string tags and convert to object to feed to prisma */
function parseTagsToArray(commaSeparatedString, tagFieldStr) {
    const splittedTag = commaSeparatedString.split(',')
    if (splittedTag.length < 2) return [] // return empty array
    let array = []
    for (let i = 0; i < splittedTag.length; i++) {
        let obj = {}
        obj[tagFieldStr] = splittedTag[i].trim().toLowerCase()
        let objFinal = {}
        objFinal.where = obj
        objFinal.create = obj
        array.push(objFinal)
    }
    return array
    /* return value is an array, something like this
    [
        {
            where: { name: 'sport' },
            create: { name: 'sport' },
        },
        {
            where: { name: 'mountain' },
            create: { name: 'mountain' },
        },
    ]
    */
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const randomSlugsOption = {
    format: "sentence",
    partsOfSpeech: ["adjective", "noun", "adjective"],
    categories: {
        adjective: ["color", "appearance"],
        noun: ["animals"],
    },
};

//API to upload a photo (or many photos) to a collection/galery User
const uploadPhotoUser = async (req, res, next) => {
    var results = []
    try {

        for (let i = 0; i < req.files.length; i++) {

            let { title, description, isPrivate, views, likes, downloaded,
                starRating, tag, albumtitle } = req.body

            const file = req.files[i]

            // mock-up values
            if (!isPrivate) isPrivate = Math.random() < 0.5;
            if (!views) views = getRandomIntInclusive(50, 1000);
            if (!likes) likes = getRandomIntInclusive(15, 100);
            if (!downloaded) downloaded = getRandomIntInclusive(0, 50);
            if (!starRating) starRating = getRandomIntInclusive(0, 10);

            // handle exif
            let cameraMake, cameraModel, shutterSpeed,
                aperture, focalLength, iso;

            file.exif ? cameraMake = file.exif.cameraMake : null
            file.exif ? cameraModel = file.exif.cameraModel : null
            file.exif ? shutterSpeed = file.exif.shutterSpeed : null
            file.exif ? aperture = file.exif.aperture : null
            file.exif ? focalLength = file.exif.focalLength : null
            file.exif ? iso = file.exif.iso : null

            // handle title
            let photoTitle;
            if (title && Array.isArray(title)) {
                if (title[i].length < 5) photoTitle = generateSlug(3, { format: "title" })
                else photoTitle = title[i]
            } else photoTitle = generateSlug(3, { format: "title" })

            // handle description
            let photoDesc;
            if (description && Array.isArray(description)) {
                if (description[i].length < 5) photoDesc = generateSlug(15, { format: "sentence" })
                else photoDesc = description[i]
            } else photoDesc = generateSlug(15, { format: "sentence" })

            let path = file.path // di sini kita sudah dapat fullpath string dari file yang diupload
            // get the userid from Jwt
            const userid = req.user.id

            let option = {}
            option.data = {
                title: photoTitle,
                description: photoDesc,
                path,
                user: { connect: { id: userid } },
                photoDetail: {
                    connectOrCreate: {
                        where: {
                            fileName: file.filename,
                        },
                        create: {
                            fileName: file.filename,
                            originalName: file.originalname,
                            mimeType: file.mimetype,
                            encoding: file.encoding,
                            size: file.size,
                            isPrivate: isPrivate || Math.random() < 0.5,
                            views: views || getRandomIntInclusive(50, 1000),
                            likes: likes || getRandomIntInclusive(15, 100),
                            downloaded: downloaded || getRandomIntInclusive(0, 50),
                            starRating: starRating || getRandomIntInclusive(0, 10),
                            cameraMake,
                            cameraModel,
                            shutterSpeed,
                            aperture,
                            focalLength,
                            iso,


                        }
                    }
                }
            }

            // check if album title is specified
            albumtitle && albumtitle.trim() ?
                option.data.albums = {
                    connectOrCreate: {
                        where: {
                            // user: {id: userid},
                            title: albumtitle
                        },
                        create: {
                            userId: userid,
                            title: albumtitle
                        }
                    }
                } : option.data.albums = {}

            // handle tags
            const tagFieldInDb = 'name' // must match field name 'name' in Tag table
            let tagArray;
            if (tag && Array.isArray(tag)) {
                console.log('tag', tag[i], i)
                tagArray = parseTagsToArray(tag[i], tagFieldInDb)
                option.data.tags = { connectOrCreate: tagArray }
            }
            // tag && tag.trim() ?
            //     option.data.tags = { connectOrCreate: tagArray } : false
            option.include = {
                photoDetail: true,
                albums: true,
                tags: true,
            }

            // add photo to db
            const result = await Photo.create(option)
            results.push(result)

        }

        req.result = results
        next()
    } catch (err) {
        next(err)
    }
}

const getAllPhotosInDatabaseWithLimit = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit)
        let option = {
            skip: 0,
            take: limit
        }
        option.include = {
            photoDetail: true,
            albums: true
        }
        let result = await Photo.findMany(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

//API to get all photos from a specific user
const getAllPhotoUser = async (req, res, next) => {
    try {
        const id = req.params.id
        let option = {}
        option.where = { userId: id }
        option.include = { tags: true, albums: true }
        let result = await Photo.findMany(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

//API to get a spesific photos from a specific user
const getOnePhotoUser = async (req, res, next) => {
    try {
        const photoId = req.params.photoId
        let option = {}
        option.where = { id: photoId }
        option.include = {
            photoDetail: true
        }
        let result = await Photo.findUnique(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

const updatePhotoDetail = async (req, res) => {
    try {
        const photoId = req.params.photoId
        const { title, description } = req.body
        let option = {}
        option.where = { id: photoId }
        option.data = { title, description }
        const result = await Photo.update(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = routes => {
    // disini sama dengan baseurl/api/photos/
    routes.get('/',
        getAllPhotosInDatabaseWithLimit,
        modifyImagePath
    )

    routes.get('/user/:id',
        getAllPhotoUser,
        modifyImagePath
    )
    routes.get('/:photoId',
        getOnePhotoUser,
        modifyImagePath
    )
    routes.post('/upload/',
        verifyJWT,
        uploadPhoto.uploadMultiplePhotos,
        uploadPhoto.resizeImagesFromDisk,
        uploadPhotoUser
    )
    routes.put('/:photoId',
        verifyJWT,
        updatePhotoDetail
    )

}