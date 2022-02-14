const { ROLE } = require('../model')

function canChangePassword (userObj, id) {
  return (
    /**
     * 'userObj' is the user that is currently logged in (from Jwt)
     * 'id' is the id of the user whose password that the userObj wants to change
     * Only Admin OR the user itself who can update/change the password
     */
     userObj.role === ROLE.ADMIN ||
     userObj.id == parseInt(id)
  )
}

function canUpdateProfile (userObj, id) {
  return (
    /**
     * 'userObj' is the user that is currently logged in (from Jwt)
     * 'id' is the id of the user whose Profile that the userObj wants to change
     * Only Admin OR the user itself who can update the profile
     */
    userObj.role === ROLE.ADMIN ||
    userObj.id == parseInt(id)
  )
}

module.exports = {
  canChangePassword,
  canUpdateProfile
}