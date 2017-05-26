const userService = require('../services/usersService')

module.exports.register = (req) => {
  const name = req.body.name
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  return userService.register(name, username, email, password)
  .then(msg => { return Promise.resolve({success: true, msg: msg}) })
  .catch(errMsg => { return Promise.reject({success: false, msg: errMsg}) })
}

module.exports.authenticate = (req) => {
  const username = req.body.username
  const password = req.body.password
  return userService.authenticate(username, password)
  .then(token => { return Promise.resolve({success: true, token: 'JWT ' + token, username: username}) })
  .catch(err => { return Promise.reject({success: false, msg: err}) })
}
