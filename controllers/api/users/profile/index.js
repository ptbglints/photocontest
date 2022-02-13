const { ROLE, User, Profile } = require('../../../../model')
const { verifyJWT } = require('../../../../middleware/authJwt')
const { authChangeProfile } = require('../../../../middleware/authUpdateProfile')

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
        const result = await Profile.findUnique(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}


const updateProfileByUserId = async (req, res, next) => {
    try {
        const { id, name, address, photoprofile } = req.body
        let option = {}
        option.where = { userid: parseInt(id) }
        option.data = { name, address, photoprofile }
        const result = await Profile.update(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

const updateProfileByUserName = async (req, res, next) => {
    try {
        const { username, name, address, photoprofile } = req.body
        let option = {}
        option.where = { username: username }
        option.data = { name, address, photoprofile }
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

    routes.put('/id',
        verifyJWT,
        authChangeProfile,
        updateProfileByUserId
    );

    routes.put('/username/',
        verifyJWT,
        authChangeProfile,
        updateProfileByUserName
    );
}