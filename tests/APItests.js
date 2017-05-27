const assert = require('chai').assert;
const request = require('superagent');
//const server = require('../app.js');
// const DB = require('../wrappers/database');

const baseUrl = 'http://localhost:8080';

//  AUXILIAR FUNCTIONS
const registerRequest = (name, username, email, password) => new Promise((resolve, reject) => {
  request.post(baseUrl + '/users/register')
    .set({'content-type': 'application/json'})
    .send({
      'name':     name,
      'username': username,
      'email':    email,
      'password': password
    })
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
});

const authenticateRequest = (username, password) => new Promise((resolve, reject) => {
  request.post(baseUrl + '/users/authenticate')
    .set({'content-type': 'application/json'})
    .send({
      'username': username,
      'password': password
    })
    .then((res) =>
      resolve(res)
    )
    .catch((err) =>
      reject(err)
    );
});

const getProfileRequest = (jwt) => new Promise((resolve, reject) => {
  request.get(baseUrl + '/users/profile')
    .set({'content-type': 'application/json'})
    .set({'Authorization': jwt})
    .send()
    .then((res) =>
      resolve(res)
    )
    .catch((err) =>
      reject(err)
    );
});

//  Leave the database in a valid state
// beforeEach((done) => {

//     DB.drop()
//   .then(done)
//   .catch(done);

// });

describe('Register', () => {
  it('POST to /users/register with a correct json msg must send success = true', () => registerRequest('diego', 'diego', 'ab', '123456')
    .then((res) => {
      assert.equal(res.body.success, true);
    }));
});

describe('Authenticate', () => {
  it('Wrong username should return success = false', () => authenticateRequest('abc', '1234')
      .then((res) => {
        assert.equal(res.body.success, false);
      }));

  it('Auth with a correct username and password should return success = true', () => registerRequest('diego', 'diego', 'ab', '123456')
    .then(() => authenticateRequest('diego', '123456'))
    .then((res) => {
      assert.equal(res.body.success, true);
    }));
});

describe('Profile', () => {
  it('With no Token it should give unauthorized status (401)', () => getProfileRequest('asdasd')
      .then((res) => Promise.reject(res))
      .catch((err) => {
        assert.equal(err.status, 401);
      }));

  it('With a correct Token it should give success true', () => registerRequest('diego', 'diego', 'ab', '123456')
    .then(() => authenticateRequest('diego', '123456'))
    .then((res) => getProfileRequest(res.body.token))
    .then((res) => {
      assert.equal(res.body.success, true);
    }));
});
