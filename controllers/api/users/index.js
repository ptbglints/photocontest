const { User, Profile } = require('../../../model')
const { verifyJWT } = require('../../../middleware/authJwt')

const getMany = async (req, res, next) => {
    try {
        const result = await User.findMany()
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

const getManyNested = async (req, res, next) => {
    try {
        console.log('nested')
        let option = {}
        option.include = {
            profile: true,
            albums: true,
            photos: true,
        }
        const result = await User.findMany(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

const getOne = async (req, res, next) => {
    try {
        // sanitize
        const id = parseInt(req.params.id)
        let option = {}
        option.where = { id: id }
        option.select = {
            id: true,
            userName: true,
            email: true,
            role: true,
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


const delUser = async (req, res, next) => {
    try {
        // sanitize
        id = parseInt(req.body.id)
        let option = {}
        option.where = { id: id }
        const result = await User.delete(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}


module.exports = routes => {
    // disini sama dengan baseurl/api/users/
    routes.get('/',
        getMany
    )

    routes.get('/nested',
        getManyNested
    )

    routes.get('/id/:id',
        getOne
    )

    routes.delete('/',
        verifyJWT,
        delUser
    )
}

