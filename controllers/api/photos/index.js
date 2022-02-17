const { Photo, User } = require('../../../model')
const { verifyJWT } = require('../../../middleware/authJwt')
const { uploadSinglePhoto } = require('../../../middleware/uploadPhoto')
const { modifyImagePath } = require('../../../middleware/modifyImagePath')

//API to upload a photo (or many photos) to a collection/galery User
const uploadPhotoUser = async (req, res, next) => {

    try {
        let { title, description } = req.body
        // if title not supplied, change the title with original file name
        if (!title) title = req.file.originalname
        // kita ambil format path dari req yang kita buat di multer storage
        let path = req.file.path // di sini kita sudah dapat fullpath string dari file yang diupload
        // get the userid from Jwt
        const userid = parseInt(req.user.id)
        let option = {}
        // tinggal massukkan ke database
        option.data = {
            title,
            description,
            path,
            userid
        }
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