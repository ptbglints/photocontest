const bcrypt = require('bcryptjs');

const EncriptPassword = async str => await bcrypt.hash(str, 10);
const CheckPassword = async (str, hash) =>  await bcrypt.compare(str, hash)
 
module.exports = {
    EncriptPassword,
    CheckPassword
}