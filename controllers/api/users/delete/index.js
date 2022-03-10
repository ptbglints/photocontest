const { User, Profile } = require('../../../../model')
const { verifyJWT } = require('../../../../middleware/authJwt')

const delUserById = async (req, res, next) => {
    try {
        // sanitize
        const id = req.params.id
        let option = {}
        option.where = {
            id
        }
        const result = await User.delete(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

const delUserByUserName = async (req, res, next) => {
    try {
        // sanitize
        const userName = req.params.userName
        let option = {}
        option.where = {
            userName
        }
        const result = await User.delete(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}


module.exports = routes => {
    // disini sama dengan baseurl/api/users/delete
    routes.delete('/id/:id',
        verifyJWT,
        delUserById
    )

    routes.delete('/username/:userName',
        verifyJWT,
        delUserByUserName
    )
}
