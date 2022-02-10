const multer = require('multer');
let fs = require('fs-extra');

let storageUser = multer.diskStorage({
  destination: function(req,file,cb){
    let userId = 1;
    let path = `/public/user/${userId}`;
    fs.mkdirSync(path);
    cb(null,path)
  },
  filename: function(req,file, cb){
    cb(null,file.fieldname + '-' + Date.now() + "." + extension)
  }
})

let upload = multer({ storage: storageUser });

let uploadPhoto = upload.single('profile-file')

module.exports = {
    uploadPhoto,
    storageUser,
}
