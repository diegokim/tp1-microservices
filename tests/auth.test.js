const assert = require('chai').assert;
const DB = require('../wrappers/database');
const prefabs = require('./requests/prefabs.requests.js')
const authReq = require('./requests/auth.requests.js')

// eslint-disable-next-line
const server = require('../app.js');    // TENEMOS QUE BUSCAR LA FORMA DE NO LEVANTAR LA APLICACION ASI

describe('Integration tests', () => {
  const user = prefabs.user;
  const username2 = 'username2';
  const username3 = 'username3';
  const username4 = 'username4';
  const newUser = prefabs.newUser;
  const newUser2 = Object.assign({}, newUser, { username: username2 });
  const newUser3 = Object.assign({}, newUser, { username: username3 });
  const newUser4 = Object.assign({}, newUser, { username: username4 });
  const wrongUser = {
    username: 'diego',
    password: 'wrooooooongpasssssswoooord'
  };

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
      .then((res) => {
        assert.equal(res.status, 404);
        assert.equal(res.message, 'Not Found');
      })
      .catch((res) => {
        assert.equal(res.status, 404);
        assert.equal(res.message, 'Not Found');
      }));


    it('Wrong password should return not found', () => authReq.registerRequest(newUser)
      .then(() => authReq.authenticateRequest(wrongUser))
      .then((res) => {
        assert.equal(res.status, 404);
        assert.equal(res.message, 'Not Found');
      })
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

  describe('Get users', () => {
    let token;
    it('Get users should return all the users in the DB as string array', () => Promise.resolve()
      .then(() => authReq.registerRequest(newUser))
      .then((res) => (token = res.body.token))
      .then(() => authReq.registerRequest(newUser2))
      .then(() => authReq.registerRequest(newUser3))
      .then(() => authReq.registerRequest(newUser4))
      .then(() => authReq.getAllUsers(token))
      .then((res) => {
        const users = res.body;
        assert.deepEqual(users, [newUser.username, username2, username3, username4])
      }));
  });
});
