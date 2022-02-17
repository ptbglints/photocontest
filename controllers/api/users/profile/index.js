const { ROLE, User, Profile } = require('../../../../model')
const { verifyJWT } = require('../../../../middleware/authJwt')
const { ValidateUpdateProfile, CheckValidatorResult } = require('../../../../utils/validator');

const getProfileByUserId = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        let option = {}
        option.where = { userid: id }
        const result = await Profile.findUnique(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

const getProfileByUserName = async (req, res, next) => {
    try {
        const username = (req.params.username)
        let option = {}
        option.where = { username: username }
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
        const { name, address, profilephoto, coverphoto } = req.body
        let option = {}
        option.where = { userid: id }
        option.data = { name, address, profilephoto, coverphoto }
        const result = await Profile.update(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = routes => {
    // disini sama dengan baseurl/api/users/profile
    routes.get('/id/:id',
        getProfileByUserId
    );

    routes.get('/username/:username',
        getProfileByUserName
    );

    routes.put('/',
        verifyJWT,
        ValidateUpdateProfile,
        CheckValidatorResult,
        updateProfile
    );
}