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
            User: { connect: { id: userid } },
        }

        // check if album title is specified
        albumtitle && albumtitle.trim() ?
            option.data.Album = {
                connectOrCreate: {
                    where: {
                        // user: {id: userid},
                        title: albumtitle
                    },
                    create: {
                        userid: userid,
                        title: albumtitle
                    }
                }
            } : false

        // check if tags are specified
        tag && tag.trim() ?
            option.data.Tag = { connectOrCreate: tagArray } : false
        option.include = {
            PhotoDetail: true,
            Album: true,
            Tag: true,
        }

        // add photo to db
        const result = await Photo.create(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }

}

//API to get all photos from a specific user
const getAllPhotoUser = async (req, res, next) => {
    try {
        const id = parseInt(req.user.id)
        let option = {}
        option.where = { userid: id }
        option.include = { tag: true, album: true }
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
        const id = parseInt(req.params.id)
        let option = {}
        option.where = { id: parseInt(id) }
        let result = await Photo.findUnique(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

const updatePhotoDetail = async (req, res) => {
    try {
        const id = parseInt(req.user.id)
        const { title, description } = req.body
        let option = {}
        option.where = { id: parseInt(id) }
        option.data = { title, description }
        const result = await Photo.update(option)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

module.exports = routes => {
    // disini sama dengan baseurl/api/photos/
    routes.get('/',
        verifyJWT,
        getAllPhotoUser,
        modifyImagePath
    )
    routes.get('/:id',
        verifyJWT,
        getOnePhotoUser,
        modifyImagePath
    )
    routes.post('/upload/',
        verifyJWT,
        uploadSinglePhoto,
        uploadPhotoUser
    )
    routes.put('/:id',
        verifyJWT,
        updatePhotoDetail
    )

}