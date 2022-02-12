const { ROLE } = require('../model')

function canChangePassword (userYangMauGantiPassword, idUserYangPaswordnyaMauDiganti) {
  return (
    userYangMauGantiPassword.role === ROLE.ADMIN ||
    userYangMauGantiPassword.id == parseInt(idUserYangPaswordnyaMauDiganti)
  )
}

module.exports = {
  canChangePassword
}