const multer = require('multer');
const fs = require('fs/promises')
const path = require('path');
const { randomUUID } = require('crypto');

// https://github.com/expressjs/multer#diskstorage
const storeOnDisk = multer.diskStorage({
    destination: async function (req, file, cb) {
        try {
            let userId = req.user.id;
            let basePath = './public'
            // join the path to become ./public/user/{id}
            const finalPath = path.join(basePath, 'user', userId.toString())
            await fs.mkdir(finalPath, { recursive: true })
            // if no error, callback will execute to create folder
            cb(null, finalPath);
        } catch (err) {
            throw new Error(err)
        }
    },
    filename: function (req, file, cb) {
        // get file extension
        let extension =  ''; // set default extension (if any)
        if (file.originalname.split(".").length>1) // checking if there is an extension or not.
        extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);

        // change stored file name to random UUID
        const finalFileName = randomUUID() + extension;
        // create file name
        cb(null, finalFileName)
    }
})

// https://github.com/expressjs/multer#filefilter
function fileFilter(req, file, cb) {

    // filter file mime type (only jpg or png are allowed)
    // Currently multer only check mime-type based on file extension
    // multer v2 (beta) will have features to check mime-type if no file extension
    if (file.mimetype === 'image/jpeg' || file.mimetype == 'image/png') {
        cb (null, true)
    } else {
        cb(new Error(`Unknown file mime type for file ${file.originalname}. Only PNG or JPG are allowed.`)) 
    }
}

const fileLimit = {
    fileSize: 2000000 // 2000000 bytes = 2 MB
}

let option = new Object
option.storage = storeOnDisk
option.fileFilter = fileFilter
option.limits = fileLimit

let upload = multer(option);

// file field name from Front-end FORM must match this value!!
const formFieldName = 'user-photo'

let uploadSinglePhoto = upload.single(formFieldName)

module.exports = {
    uploadSinglePhoto
}
