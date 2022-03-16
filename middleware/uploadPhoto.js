const multer = require('multer');
const sharp = require("sharp");
var cloudinary = require('cloudinary')
var exif = require('exif-reader');
const fs = require('fs/promises')
const path = require('path');
const crypto = require('crypto');
var cuid = require('cuid');
const { sprintf } = require('sprintf-js');
const winston = require('../utils/winstonlogger');

const storeOnMemory = multer.memoryStorage()

// https://github.com/expressjs/multer#diskstorage
const storeOnDisk = multer.diskStorage({
    destination: async function (req, file, cb) {
        try {
            // const userId = req.user.id;
            const basePath = './public/tmp'
            // const userDir = sprintf('%010s', userId)

            // join the path to become ./public/tmp/eccbc87e4b5ce2fe28308fd9f2a7baf3
            let finalPath = ``;
            // check route name to decide the final folder to store
            // if (req.baseUrl.includes('photo')) finalPath = path.join(basePath, userDir, "photos")
            // if (req.baseUrl.includes('profile')) finalPath = path.join(basePath, userDir, "profile")

            // finalPath = path.join(basePath, 'tmp')
            finalPath = basePath
            await fs.mkdir(finalPath, { recursive: true })
            // if no error, callback will execute to create folder
            cb(null, finalPath);
        } catch (err) {
            // res.status(500).send('Error uploading photo.')
            throw err
        }
    },
    filename: function (req, file, cb) {
        try {
            // get file extension
            let extension = ''; // set default extension (if any)
            if (file.originalname.split(".").length > 1) // checking if there is an extension or not.
                extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);

            // change stored file name to random hash string
            const finalFileName = cuid() + extension;
            // create file name
            cb(null, finalFileName)
        } catch (err) {
            throw new Error(err)
        }

    }
})

// https://github.com/expressjs/multer#filefilter
function fileFilter(req, file, cb) {

    // filter file mime type (only jpg or png are allowed)
    // Currently multer only check mime-type based on file extension
    // multer v2 (beta) will have features to check mime-type if no file extension
    if (file.mimetype === 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true)
    } else {
        cb(new Error(`Unknown file mime type for file ${file.originalname}. Only PNG or JPG are allowed.`))
    }
}

const fileLimit = {
    fileSize: 10 * 1024 * 1024, // 10MB; For multipart forms, the max file size (in bytes)
    fields: 20,     // Max number of non-file fields
    files: 3,       //For multipart forms, the max number of file fields
}

let option = new Object
const multerStorage = multer.memoryStorage();
option.storage = storeOnDisk
// option.storage = storeOnMemory
option.fileFilter = fileFilter
option.limits = fileLimit

let upload = multer(option);

// file field name from Front-end FORM must match this value!!
const formFieldName = 'photo'

let uploadSinglePhoto = upload.single(formFieldName)
const uploadMultiplePhotos = upload.array(formFieldName, 3);

const resizeImagesFromDisk = async (req, res, next) => {
    try {
        if (!req.files) return next();
        // req.body.images = [];
        await Promise.all(
            req.files.map(async file => {
                // const filename = file.originalname.replace(/\..+$/, "");
                // const newFilename = `bezkoder-${filename}-${Date.now()}.jpeg`;
                const userId = req.user.userName;
                const basePath = './public/tmp'
                // const userDir = sprintf('%010s', userId)
                const userDir = userId

                const projectName = process.env.PROJECT_NAME
                let storePath = '';
                // check route name to decide the final folder to store
                if (req.baseUrl.includes('photo')) storePath = path.join(projectName, userDir, "photos")
                if (req.baseUrl.includes('profile')) storePath = path.join(projectName, userDir, "profile")

                storePath = storePath.split(path.sep).join(path.posix.sep)

                let newPath = ``;

                newPath = path.join(basePath, userDir)
                await fs.mkdir(newPath, { recursive: true })
                winston.info(file.path)
                const oldPath = file.path
                const image = sharp(oldPath)
                await image
                    .metadata()
                    .then(function (metadata) {
                        if (metadata) {
                            if (metadata.exif) {
                                var parsed = exif(metadata.exif);
                                // console.log('EXIF', parsed)
                                const metaExif = {
                                    cameraMake: parsed.image.Make,
                                    cameraModel: parsed.image.Model,
                                    aperture: `f/${parsed.exif.FNumber}`,
                                    shutterSpeed: `1/${Math.round(1 / parsed.exif.ExposureTime)}`,
                                    focalLength: `${parsed.exif.FocalLength} mm`,
                                    iso: parsed.exif.ISO
                                }
                                file.exif = metaExif
                            }

                        }
                        return image
                            .resize({
                                width: null,
                                height: 600,
                                fit: 'cover',
                                withoutEnlargement: true,
                                fastShrinkOnLoad: true
                            })
                            // .webp()
                            // .toFormat("jpeg")
                            // .jpeg({ quality: 90 })
                            // const fullNewPath = path.join(newPath, file.filename)
                            .toFile(path.join(newPath, file.filename))
                    })
                    // .cloudinary.uploader.upload(newPath)
                    .then(function () {
                        return cloudinary.v2.uploader.upload(path.join(newPath, file.filename), { folder: storePath }, function (result) {
                            return result
                        })
                    })
                    .then(resultCloudinary => {
                        // winston.log('info', "Done!", result);

                        // console.log(resultCloudinary)
                        // delete temp file
                        fs.unlink(file.path)
                        // delete temp sharp file
                        fs.rmdir(newPath, { recursive: true })
                        console.log('newPath', newPath)
                        file.path = resultCloudinary.secure_url
                        // file.path = `${newPath}/${file.filename}`
                        file.destination = newPath
                        file.size = resultCloudinary.bytes
                        file.cloudinary = resultCloudinary
                    })
            })
        );
        console.log(req.files)
        next();
    } catch (err) {
        if (req.files)
            next(err)
    }
};



// const getResult = async (req, res) => {
//     if (req.files.length <= 0) {
//         return res.send(`You must select at least 1 image.`);
//     }
//     const images = req.files
//         .map(image => console.log(image))
//     // .join("");
//     return res.send(`Images were uploaded:${images}`);
// };


module.exports = {
    uploadSinglePhoto,
    uploadMultiplePhotos,
    resizeImagesFromDisk,
}
