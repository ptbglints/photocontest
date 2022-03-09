const { User, Profile } = require('../../../../model')
const { verifyJWT } = require('../../../../middleware/authJwt')

const getOneByUserName = async (req, res, next) => {
    try {
        // sanitize
        const userName = req.params.userName
        let option = {}
        option.where = { userName: userName }
        option.include = {
            profile: true,
            albums: true
        }
        const result = await User.findUnique(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = routes => {
    // disini sama dengan baseurl/api/users/username
    routes.get('/:userName',
        getOneByUserName
    )
}