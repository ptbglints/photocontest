const express = require('express')
const router = express.Router()

const { User } = require('../../../model')
const { verifyJWT } = require('../../../middleware/authJwt')

const getMany = async (req, res, next) => {
    try {
        req.result= await User.findMany()
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
        req.result = await User.findUnique(option)
        next()
    } catch (err) {
        next(err)
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
        next(err)
    }
}


// disini sama dengan baseurl/api/users/
router.get('/',
    // verifyJWT,
    getMany
)
router.get('/:id',
    // verifyJWT,
    getOne
)
router.delete('/',
    verifyJWT,
    delUser
)

module.exports = router
