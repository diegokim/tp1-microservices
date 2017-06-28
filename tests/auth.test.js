const assert = require('chai').assert;
const DB = require('../wrappers/database');
const prefabs = require('./requests/prefabs.requests.js')
const authReq = require('./requests/auth.requests.js')

// eslint-disable-next-line
const server = require('../app.js');    // TENEMOS QUE BUSCAR LA FORMA DE NO LEVANTAR LA APLICACION ASI

describe('Integration tests', () => {
  const user = prefabs.user;
  const newUser = prefabs.newUser;

	// Leave the database in a valid state
  beforeEach((done) => {
    DB.drop()
		.then(done)
		.catch(done);
  });

  describe('Register', () => {
    it('POST to /users/register with a correct user', () => authReq.registerRequest(newUser)
      .then((res) => {
        assert.equal(res.status, 201);
        assert.include(res.body, newUser);
      }));
  });

  describe('Authenticate', () => {
    it('Wrong username should return not found', () => authReq.authenticateRequest(user)
      .catch((res) => {
        assert.equal(res.status, 404);
        assert.equal(res.message, 'Not Found');
      }));

    it('Auth with a correct username and password should return a token', () => authReq.registerRequest(newUser)
      .then((res) => {
        assert.deepProperty(res.body, 'token');
        return authReq.authenticateRequest(user)
      })
      .then((res) => {
        assert.equal(res.status, 200);
        assert.deepProperty(res.body, 'token');
      }));
  });

  describe('Profile', () => {
    it('With no Token it should give unauthorized status (401)', () => authReq.getProfileRequest('asdasd')
      .catch((res) => {
        assert.equal(res.status, 401);
        assert.equal(res.message, 'Unauthorized');
      }));

    it('With a correct Token it should give success true', () => authReq.registerRequest(newUser)
      .then(() => authReq.authenticateRequest(user))
      .then((res) => authReq.getProfileRequest(res.body.token))
      .then((res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.success, true);
      }));
  });
});
