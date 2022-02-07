const bcrypt = require('bcryptjs');

const EncriptPassword = async str => await bcrypt.hash(str, 10);

module.exports = {EncriptPassword}