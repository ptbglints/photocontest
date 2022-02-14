function responseSuccess(req,res, next) {
    if (req.result) {
        const response = {
            status: res.statusCode,
            message: 'Success',
            data: req.result,
        }
        return res.json(response)
    }
    next()
}

module.exports = {
    responseSuccess
}