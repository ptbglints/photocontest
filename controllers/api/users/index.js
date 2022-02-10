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
        res.status(400).json({ code, message });
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
        res.status(400).json({ code, message });
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
        res.status(400).json({ code, message });
    }
}


module.exports = routes => {
    // disini sama dengan baseurl/api/users/

    /**
     * @swagger
     *  /api/users/:
     *    get:
     *      summary: Retrieves a user
     *      tags: [User APIs]
     *      responses:
     *        "200":
     *          description: Corporate org structure for a client
     */
    routes.get('/',
        // verifyJWT,
        getMany
    )

    /**
     * @swagger
     *  /api/users/{id}:
     *    get:
     *      summary: Retrieves a user
     *      tags: [User APIs]
     *      parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: User ID
     *      responses:
     *        "200":
     *          description: Corporate org structure for a client
     */
    routes.get('/:id',
        // verifyJWT,
        getOne
    )
    routes.delete('/',
        verifyJWT,
        delUser
    )

    /**
     * @swagger
     * tags:
     *   name: User APIs
     *   description: APIs to handle user resources.
     */


    /**
     * @swagger
     *  /api/user/{userId}:
     *    get:
     *      summary: Retrieves a user
     *      tags: [User APIs]
     *      parameters:
     *      - in: path
     *        name: userId
     *        schema:
     *          type: string
     *        required: true
     *        description: User ID
     *      responses:
     *        "200":
     *          description: Corporate org structure for a client
     */
    // routes.get("/:userId", userService.getUser);


}

