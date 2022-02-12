function responseSuccess(req,res) {
    const response = {
        status: res.statusCode,
        message: 'Success',
        data: req.result,
    }
    res.json(response)
}

module.exports = {
    responseSuccess
}