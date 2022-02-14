const multer = require('multer');
let fs = require('fs-extra');
const paths = require('path');
const { verifyJWT } = require('../middleware/authJwt')


let storageUser = multer.diskStorage({
    destination: function(req, file, cb) {
        let userId = req.user;
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
// penambahan filter dari size dan file type.
let upload = multer({ 
    storage: storageUser,
    limits: {
        fileSize: 2000000 // 2000000 bytes = 2 MB
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png | jpg)$/)){
            // upload only png and jpg format
        return cb(new Error('Please upload a Image jpg and png only'))
        }
        cb(undefined,true)
        }
        
 });

let uploadPhoto = upload.single('user-photo')

module.exports = {
    uploadPhoto,
    storageUser,
}