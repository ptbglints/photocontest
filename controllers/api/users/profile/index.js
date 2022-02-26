const { ROLE, User, Profile } = require('../../../../model')
const { verifyJWT } = require('../../../../middleware/authJwt')
const { ValidateUpdateProfile, CheckValidatorResult } = require('../../../../middleware/validator');
const { uploadSinglePhoto } = require('../../../../middleware/uploadPhoto')

const getProfileByUserId = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id)
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
        const { name, address, profilePhoto, coverPhoto } = req.body
        let option = {}
        option.where = { userId: id }
        option.data = {
            name,
            address,
            // profilePhoto,
            // coverPhoto
        }
        console.log(name, address)
        const result = await Profile.update(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = routes => {
    // disini sama dengan baseurl/api/users/profile
    routes.get('/userid/:id',
        getProfileByUserId
    );

    routes.get('/username/:userName',
        getProfileByUserName
    );

    routes.put('/',
        verifyJWT,
        uploadSinglePhoto,
        ValidateUpdateProfile,
        CheckValidatorResult,
        updateProfile
    );
}