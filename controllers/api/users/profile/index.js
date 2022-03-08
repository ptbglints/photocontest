const { ROLE, User, Profile } = require('../../../../model')
const { verifyJWT } = require('../../../../middleware/authJwt')
const { ValidateUpdateProfile, CheckValidatorResult } = require('../../../../middleware/validator');
const { uploadSinglePhoto } = require('../../../../middleware/uploadPhoto')
const { modifyImagePath, modifyImagePath2ndLayer, modifyProfilePhotoPath, modifyProfilePhotoPath2ndLayer } = require('../../../../middleware/modifyImagePath');

const getMany = async (req, res, next) => {
    try {
        let { skip, take } = req.query
        if (!skip) skip = 0
        if (!take) take = 100

        skip = parseInt(skip)
        take = parseInt(take)

        if (take > 100) take = 100
        let option = {}
        option.skip = skip
        option.take = take

        const result = await Profile.findMany(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

const getProfileByUserId = async (req, res, next) => {
    try {
        const userId = req.params.id
        let option = {}
        option.where = { userId: userId }
        const result = await Profile.findUnique(option)

        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

const getProfileByUserName = async (req, res, next) => {
    try {
        const userName = (req.params.userName)
        let option = {}
        option.where = { userName: userName }
        option.select = { profile: true }
        const result = await User.findUnique(option)
        req.result = result.profile
        next()
    } catch (err) {
        next(err)
    }
}


const updateProfile = async (req, res, next) => {
    try {
        const id = req.user.id
        const { name, address, email } = req.body
        let option = {}
        option.where = { userId: id }
        let profilePhotoPath;
        if (req.file) {
            profilePhotoPath = req.file.path
        }
        option.data = {
            name,
            address,
            profilePhoto: profilePhotoPath,
            email,
            // coverPhoto
        }
        const result = await Profile.update(option)

        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = routes => {
    // disini sama dengan baseurl/api/users/profile
    routes.get('/',
        getMany,
        modifyProfilePhotoPath
    );

    routes.get('/userid/:id',
        getProfileByUserId,
        modifyProfilePhotoPath

    );

    routes.get('/username/:userName',
        getProfileByUserName,
        modifyProfilePhotoPath
    );

    routes.put('/',
        verifyJWT,
        uploadSinglePhoto,
        ValidateUpdateProfile,
        CheckValidatorResult,
        updateProfile,
        modifyProfilePhotoPath
    );
}