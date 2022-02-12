const { Photo, User } = require('../../../model')
const { verifyJWT } = require('../../../middleware/authJwt')
const { uploadPhoto, storageUser } = require('../../../utils/upload')


//API to upload a photo (or many photos) to a collection/galery User
const uploadPhotoUser = async(req, res) => {
    // kita error tadi karena salah field pass request
    // kenapa?? karena field file nya harus nya user-photo bukan path 
    // definisi field nya di sini 
    // let uploadPhoto = upload.single('user-photo')
    // contoh request, metode tetap menggunakan multipart/form-data
    // body
    // {
    //     "title": "test",
    //     "description": "test",

    //     user-photo = file yang di upload

    // tadi kita salah..
    // karena field file nya namanya user-photo bukan path
    // }

    try {
        let { title, description } = req.body
            // kita ambil format path dari req yang kita buat di multer storage
        let pathPhoto = `${req._filepath}` // di sini kita sudah dapat fullpath string dari file yang diupload
            // tinggal massukkan ke database
        let option = {}
            // lanjutkan memasukkan ke data base
        option.data = {
            title,
            description,
            path: pathPhoto
        }
        console.log(title, description, pathPhoto)
        res.json("result")
    } catch (err) {
        console.log(err)
        code = err.code || 'Unknown'
        message = err.message || "Error occurred."
        res.status(400).json({ code, message });
    }

}

//API to get all photos from a specific user
const getAllPhotoUser = async(req, res) => {
    try {
        const id = parseInt(req.user.id)
        let option = {}
        option.where = { id: id }
        let result = await User.findUnique(option, {
            include: {
                Photo: true
            }
        })
        res.json(result)
    } catch (err) {
        console.log(err)
        code = err.code || 'Unknown'
        message = err.message || "Error occurred."
        res.status(400).json({ code, message });
    }
}

//API to get a spesific photos from a specific user
const getOnePhotoUser = async(req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        let option = {}
        option.where = { userid: userid }
        let result = await User.findUnique(option, {
            include: {
                Photo: {
                    id: req.params.id
                }
            }
        })
        res.json(result)
    } catch (err) {
        console.log(err)
        code = err.code || 'Unknown'
        message = err.message || "Error occurred."
        res.status(400).json({ code, message });
    }
}

//API to get 3 or specific number latest photos from a specific user
const get3LatestPhotoUser = async(req, res, next) => {
    try {
        const id = parseInt(req.user.id)
        let option = {}
        option.where = { userid: userid }
        let result = await User.findUnique(option, {
            include: {
                Photo: {
                    take: parseInt(req.query.limit),
                    orderBy: {
                        createdAt: 'desc',

                    }
                }
            }
        })
        res.json(result)
    } catch (err) {
        console.log(err)
        code = err.code || 'Unknown'
        message = err.message || "Error occurred."
        res.status(400).json({ code, message });
    }
}

//API to get default 15 latest photos from a specific user
const get15LatestPhotoUser = async(req, res, next) => {
    try {
        const id = parseInt(req.user.id)
        let option = {}
        option.where = { userid: userid }
        let result = await User.findUnique(option, {
            include: {
                Photo: {
                    take: parseInt(req.query.limit) || 15,
                    orderBy: {
                        createdAt: 'desc',

                    }
                }
            }
        })
        res.json(result)
    } catch (err) {
        console.log(err)
        code = err.code || 'Unknown'
        message = err.message || "Error occurred."
        res.status(400).json({ code, message });
    }
}

const updatePhotoDetail = async (req, res) => {
    try {
        const userid = parseInt(req.user.id)
        const { title, description } = req.body
        let option = {}
        option.where = { userid: userid }
        option.data = { title, description }
        const result = await Profile.update(option)
        res.json(result)
    } catch (err) {
        console.log(err)
        code = err.code || 'Unknown'
        message = err.message || "Error occurred."
        res.status(400).json({ code, message });
    }
}


const delPhoto = async(req, res) => {
    try {
        let { id } = req.body
        id = Number(id)
        let option = {}
        option.where = { id: id }
        const result = await Photo.delete(option)
        res.json(result)
    } catch (err) {
        console.log(err)
        code = err.code || 'Unknown'
        message = err.message || "Error occurred."
        res.status(400).json({ code, message })
    }
}

module.exports = routes => {
    // disini sama dengan baseurl/api/photos/
    routes.get('/',
        getAllPhotoUser
    )
    routes.get('/:id',
        getOnePhotoUser
    )
    routes.post('/upload/',
        verifyJWT,
        uploadPhoto,
        uploadPhotoUser
    )
    routes.delete('/',
        verifyJWT,
        delPhoto
    )
    routes.put('/:id', 
        verifyJWT,
        updatePhotoDetail
    )

}