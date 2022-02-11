const { ROLE, Profile } = require('../../../../model')
const { verifyJWT } = require('../../../../middleware/authJwt')
const { authRole } = require('../../../../middleware/authRole')

const getProfile = async (req, res) => {
    try {
        const userid = parseInt(req.params.userid)
        let option = {}
        option.where = { userid: userid }
        const result = await Profile.findUnique(option)
        res.json(result)
    } catch (err) {
        console.log(err)
        code = err.code || 'Unknown'
        message = err.message || "Error occurred."
        res.status(400).json({ code, message });
    }
}


const updateProfile = async (req, res) => {
    try {
        const userid = parseInt(req.params.userid)
        const { name, address, photoprofile } = req.body
        let option = {}
        option.where = { userid: userid }
        option.data = { name, address, photoprofile }
        const result = await Profile.update(option)
        res.json(result)
    } catch (err) {
        console.log(err)
        code = err.code || 'Unknown'
        message = err.message || "Error occurred."
        res.status(400).json({ code, message });
    }
}

module.exports = routes => {
    // disini sama dengan baseurl/api/users/profile
    /**
     * This api getting the user profile by id
     * @route GET /api/users/profile/{id}
     * @group user - get user
     * @param {string} id.param.required - id of user
     * @returns {object} 200 - An array of user info
     * @returns {Error}  default - Unexpected error
     */
    routes.get('/:userid',
        verifyJWT,
        authRole([ROLE.MODERATOR, ROLE.ADMIN]),
        getProfile
    );
    /**
     * This api updating the user profile by id
     * @route PUT /api/users/profile/{id}
     * @group user - update user
     * @param {string} id.param.required - id of user
     * @param {object} body.required - payload of user
     * @returns {object} 200 - An array of user info
     * @returns {Error} default - Unexpected error
     */
    routes.put('/:userid',
        verifyJWT,
        updateProfile
    );
}