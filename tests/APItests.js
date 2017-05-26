const assert = require('chai').assert
const request = require('superagent')
const server = require('../app.js')
const DB = require('../wrappers/database')

var baseUrl = 'http://localhost:8080'

//  AUXILIAR FUNCTIONS
var registerRequest = (name, username, email, password) => {
  return new Promise((resolve, reject) => {
    request.post(baseUrl + '/users/register')
    .set({'content-type': 'application/json'})
    .send({
      name: name,
      username: username,
      email: email,
      password: password
    })
    .then((res) => {
      resolve(res)
    })
    .catch((err) => {
      reject(err)
    })
  })
}

var authenticateRequest = (username, password) => {
  return new Promise((resolve, reject) => {
    request.post(baseUrl + '/users/authenticate')
    .set({'content-type': 'application/json'})
    .send({
      username: username,
      password: password
    })
    .then(res =>
      resolve(res)
    )
    .catch(err =>
      reject(err)
    )
  })
}

var getProfileRequest = (jwt) => {
  return new Promise((resolve, reject) => {
    request.get(baseUrl + '/users/profile')
    .set({'content-type': 'application/json'})
    .set({'Authorization': jwt})
    .send()
    .then(res =>
      resolve(res)
    )
    .catch(err =>
      reject(err)
    )
  })
}

//  Leave the database in a valid state
beforeEach(function (done) {
  DB.drop()
  .then(done)
  .catch(done)
})

describe('Register', () => {
  it('POST to /users/register with a correct json msg must send success = true', () => {
    return registerRequest('diego', 'diego', 'ab', '123456')
    .then((res) => {
      assert.equal(res.body.success, true)
    })
  })
})

describe('Authenticate', () => {
  it('Wrong username should return success = false', () => {
    return authenticateRequest('abc', '1234')
      .then(res => {
        assert.equal(res.body.success, false)
      })
  })

  it('Auth with a correct username and password should return success = true', () => {
    return registerRequest('diego', 'diego', 'ab', '123456')
    .then(res => {
      return authenticateRequest('diego', '123456')
    })
    .then(res => {
      assert.equal(res.body.success, true)
    })
  })
})

describe('Profile', () => {
  it('With no Token it should give unauthorized status (401)', () => {
      return getProfileRequest('asdasd')
      .then(res => {
        return Promise.reject(res)
      })
      .catch(err => {
        assert.equal(err.status, 401)
      })
  })

  it('With a correct Token it should give success true', () => {
    return registerRequest('diego', 'diego', 'ab', '123456')
    .then((res) => {
      return authenticateRequest('diego', '123456')
    })
    .then(res => {
      return getProfileRequest(res.body.token)
    })
    .then(res => {
      assert.equal(res.body.success, true)
    })
  })
})
