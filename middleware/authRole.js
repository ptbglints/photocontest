// helper function
function CheckIfAllowed (roleArray, userRole) {
  if (roleArray.indexOf(userRole) !== -1) return true
  return false
}

function authRole(allowedRoleArray) {
  return (req, res, next) => {
    const roleInToken = req.user.role
    const isAllowed = CheckIfAllowed(allowedRoleArray, roleInToken)
    let message = `Unauthorized. Your role is insufficient to perform this operation.`
    if (!isAllowed) return res.status(401).json({ message })

    next();
  }
}


module.exports = {
  authRole
}