const multer = require('multer');
let fs = require('fs-extra');
const paths = require('path');
const { register } = require('ts-node');


let storageUser = multer.diskStorage({
    destination: function(req, file, cb) {
        let userId = 1;
        let path_name = `/public/user/${userId}`
            // simpan format path untuk di gunakana nanti ke dalam request
        req._filepath = path_name;
        let path = paths.join(__dirname, `..${path_name}`);
        // memastikan directory ada / jika tidak ada maka di buat
        fs.ensureDir(path, err => {
            // buat handle klo error
            console.log(err) // => null
            cb(null, path);
            // dir has now been created, including the directory it is to be placed in
        })

    },
    filename: function(req, file, cb) {
        // ambil extensi file
        let extension = file.originalname.split('.').pop();
        //format nama file
        let filename = file.fieldname + '-' + Date.now() + "." + extension;
        // update format path dengan nama file di request yang kita buat sebelumnya di destination
        req._filepath = req._filepath + '/' + filename;
        cb(null, filename)
    }
})

let upload = multer({ storage: storageUser });

let uploadPhoto = upload.single('profile-file')

module.exports = {
    uploadPhoto,
    storageUser,
}