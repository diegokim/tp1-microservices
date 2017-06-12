module.exports.isValidNewUser = (user) => (
  user.username &&
  user.password &&
  user.email &&
  user.name
)

module.exports.isValidUser = (user) => (
  user.username &&
  user.password
)
