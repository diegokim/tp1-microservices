const assert = require('chai').assert;
const request = require('superagent');
const DB = require('../wrappers/database');

// eslint-disable-next-line
const server = require('../app.js');    // TENEMOS QUE BUSCAR LA FORMA DE NO LEVANTAR LA APLICACION ASI

const baseUrl = 'http://localhost:8080'; // VARIABLE DE CONF

describe('Integration tests', () => {
  const name = 'diego';
  const username = 'diego';
  const email = 'diego@gmail.com';
  const password = 'kim';
  const user = {
    username,
    password
  };
  const newUser = {
    name,
    username,
    email,
    password
  };

	// Leave the database in a valid state
  beforeEach((done) => {
    DB.drop()
		.then(done)
		.catch(done);
  });

  describe('Register', () => {
    it('POST to /users/register with a correct user', () => registerRequest(newUser)
      .then((res) => {
        assert.equal(res.status, 201);
        assert.include(res.body, newUser);
      }));
  });

  describe('Authenticate', () => {
    it('Wrong username should return not found', () => authenticateRequest(user)
      .catch((res) => {
        assert.equal(res.status, 404);
        assert.equal(res.message, 'Not Found');
      }));

    it('Auth with a correct username and password should return a token', () => registerRequest(newUser)
      .then((res) => {
        assert.deepProperty(res.body, 'token');
        return authenticateRequest(user)
      })
      .then((res) => {
        assert.equal(res.status, 200);
        assert.deepProperty(res.body, 'token');
      }));
  });

  describe('Profile', () => {
    it('With no Token it should give unauthorized status (401)', () => getProfileRequest('asdasd')
      .catch((res) => {
        assert.equal(res.status, 401);
        assert.equal(res.message, 'Unauthorized');
      }));

    it('With a correct Token it should give success true', () => registerRequest(newUser)
      .then(() => authenticateRequest(user))
      .then((res) => getProfileRequest(res.body.token))
      .then((res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.success, true);
      }));
  });
});

//  AUXILIAR FUNCTIONS
const registerRequest = (newUser) => Promise.resolve(
  request.post(baseUrl + '/users/register')
    .set({'content-type': 'application/json'})
    .send(newUser)
);

const authenticateRequest = (user) => Promise.resolve(
  request.post(baseUrl + '/users/authenticate')
    .set({'content-type': 'application/json'})
    .send(user)
);

const getProfileRequest = (jwt) => Promise.resolve(
  request.get(baseUrl + '/users/profile')
    .set({'content-type': 'application/json'})
    .set({'Authorization': jwt})
    .send()
);
