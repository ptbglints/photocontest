const { GetAllData, GetOneDataById, DeleteDataById } = require('../../model')
const { User } = require('../../model')

const getAllUser = async (req, res) => {
    try {
        let { id } = req.body
        let result
        if (id) {
            // sanitize
            id = Number(id)
            result = await GetOneDataById(User,id)
        } else {
            result = await GetAllData(User)
        }
        res.json(result)
    } catch (err) {
        let message = err.message || "Error occurred."
        res.status(400).send({
            message: message
        });
    }
}


const delUser = async (req, res) => {
    try {
        let { id } = req.body
        // sanitize
        id = Number(id)
        const result = await DeleteDataById(User, id)
        res.json(result)
    } catch (err) {
        let message = err.message || "Error occurred."
        res.status(400).send({
            message: message
        });
    }
}


module.exports = routes => {
    // disini sama dengan baseurl/api/users/register
    routes.get('/', getAllUser)
    routes.delete('/', delUser)
}