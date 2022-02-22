function handle404(req, res, next) {
    res.status(404).send({ message: 'Oops error 404 🥵 Sorry gan 🙏' });
}

module.exports = {
    handle404
}