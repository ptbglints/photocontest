const { User } = require('../../../model')
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
        let option = new Object
        option.include = {
            photo: true,
            album: true
        }
        const result = await User.findMany()
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
            username: true,
            email: true,
            role: true
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

