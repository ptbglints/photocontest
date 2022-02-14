const express = require('express')
const router = express.Router()

const { ROLE, User, Profile } = require('../../../model')
const { verifyJWT } = require('../../../middleware/authJwt')
const { authRole } = require('../../../middleware/authRole')

const getProfileByUserId = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        let option = {}
        option.where = { userid: id }
        const result = await Profile.findUnique(option)
        res.json(result)
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
        res.json(result.profile)
    } catch (err) {
        next(err)
    }
}


const updateProfileByUserId = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const { name, address, photoprofile } = req.body
        let option = {}
        option.where = { userid: id }
        option.data = { name, address, photoprofile }
        const result = await Profile.update(option)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const updateProfileByUserName = async (req, res, next) => {
    try {
        const username = req.params.username
        const { name, address, photoprofile } = req.body
        let option = {}
        option.include = { User: true }
        option.include.where = { username: username }
        option.data = { name, address, photoprofile }
        const result = await Profile.update(option)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

router.get('/id/:id',
    getProfileByUserId
);

router.get('/username/:username',
    getProfileByUserName
);

router.put('/id/:id',
    updateProfileByUserId
);

router.put('/username/:username',
    updateProfileByUserName
);

module.exports = router