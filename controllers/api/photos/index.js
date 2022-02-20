const { Photo, User, prisma } = require('../../../model')
const { verifyJWT } = require('../../../middleware/authJwt')
const { uploadSinglePhoto } = require('../../../middleware/uploadPhoto')
const { modifyImagePath } = require('../../../middleware/modifyImagePath')

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


//API to upload a photo (or many photos) to a collection/galery User
const uploadPhotoUser = async (req, res, next) => {

    try {
        let { title, description, albumtitle, tag } = req.body

        // if photo title not supplied, change the title with original file name
        if (!title) title = req.file.originalname
        // kita ambil format path dari req yang kita buat di multer storage
        let path = req.file.path // di sini kita sudah dapat fullpath string dari file yang diupload
        console.log(req.file)
        // get the userid from Jwt
        const userid = parseInt(req.user.id)

        // proces tags
        const tagFieldInDb = 'name' // must match field name 'name' in Tag table
        let tagArray;
        if (tag) tagArray = parseTagsToArray(tag, tagFieldInDb)

        let option = {}
        option.data = {
            title,
            description,
            path,
            user: { connect: { id: userid } },
            photoDetail: {
                connectOrCreate: {
                    where: {
                        fileName: req.file.filename,
                    },
                    create: {
                        fileName: req.file.filename,
                        originalName: req.file.originalname,
                        mimeType: req.file.mimetype,
                        encoding: req.file.encoding,
                        size: req.file.size
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

        // check if tags are specified
        tag && tag.trim() ?
            option.data.tags = { connectOrCreate: tagArray } : false
        option.include = {
            photoDetail: true,
            albums: true,
            tags: true,
        }

        // add photo to db
        const result = await Photo.create(option)
        req.result = result
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
        const id = parseInt(req.params.id)
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
        const photoId = parseInt(req.params.photoId)
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
        const photoId = parseInt(req.params.photoId)
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
        uploadSinglePhoto,
        uploadPhotoUser
    )
    routes.put('/:photoId',
        verifyJWT,
        updatePhotoDetail
    )

}