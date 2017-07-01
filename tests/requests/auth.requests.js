const request = require('superagent');
const baseUrl = require('./config.requests.js').baseUrl

module.exports.registerRequest = (newUser) => Promise.resolve(
  request.post(baseUrl + '/users/register')
    .set({'content-type': 'application/json'})
    .send(newUser)
);

module.exports.authenticateRequest = (user) => Promise.resolve(
  request.post(baseUrl + '/users/authenticate')
    .set({'content-type': 'application/json'})
    .send(user)
);

module.exports.getProfileRequest = (jwt) => Promise.resolve(
  request.get(baseUrl + '/users/profile')
    .set({'content-type': 'application/json'})
    .set({'Authorization': jwt})
    .send()
);

module.exports.getAllUsers = (jwt) => Promise.resolve(
  request.get(baseUrl + '/users')
    .set({'content-type': 'application/json'})
    .set({'Authorization': jwt})
    .send()
);
