const { User } = require('../../../model')
const { verifyJWT } = require('../../../middleware/authJwt')

const getMany = async (req, res) => {
    try {
        const result = await User.findMany()
        res.json(result)
    } catch (err) {
        console.log(err)
        code = err.code || 'Unknown'
        message = err.message || "Error occurred."
        res.status(400).json({code, message});
    }
}

const getOne = async (req, res, next) => {
    try {
        // sanitize
        const id = parseInt(req.params.id)
        let option = {}
        option.where = { id: id }
        let result = await User.findUnique(option)
        res.json(result)
    } catch (err) {
        console.log(err)
        code = err.code || 'Unknown'
        message = err.message || "Error occurred."
        res.status(400).json({code, message});
    }
}


const delUser = async (req, res) => {
    try {
        let { id } = req.body
        // sanitize
        id = Number(id)
        let option = {}
        option.where = { id: id }
        const result = await User.delete(option)
        res.json(result)
    } catch (err) {
        console.log(err)
        code = err.code || 'Unknown'
        message = err.message || "Error occurred."
        res.status(400).json({code, message});
    }
}


module.exports = routes => {
    // disini sama dengan baseurl/api/users/
    routes.get('/', verifyJWT, getMany)
    routes.get('/:id', getOne)
    routes.delete('/', delUser)
}