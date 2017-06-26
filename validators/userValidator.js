module.exports.isValidNewUser = (user) => (
  user.username &&
  user.password &&
  user.email &&
  user.name &&
  user.nacimiento
)

module.exports.isValidUser = (user) => (
  user.username &&
  user.password
)
