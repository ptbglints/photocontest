function responseSuccess(req,res, next) {
    if (req.result) {
        const response = {
            status: res.statusCode,
            message: 'Success',
            result: req.result,
        }
        return res.json(response)
    }
    next()
}

module.exports = {
    responseSuccess
}