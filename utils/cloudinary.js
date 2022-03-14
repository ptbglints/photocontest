var cloudinary = require('cloudinary')


function uploadToCloud(localPath) {
    cloudinary.uploader.upload(localPath,
        function (result) {
            console.log(result)
        }
    )
}

exports.module = {
    uploadToCloud
}