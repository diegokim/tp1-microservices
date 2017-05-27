const assert = require('chai').assert;
const request = require('superagent');
// const server = require('../app.js');
const DB = require('../wrappers/database');

const baseUrl = 'http://localhost:8080';


describe('Integration tests', () => {
	// Leave the database in a valid state
  beforeEach((done) => {
    DB.drop()
		.then(done)
		.catch(done);
  });

  describe('Status', () => {
    let response;
    beforeEach(() => (response = request.get(baseUrl + '/ping')
      .send()
      .catch((err) =>
        reject(err)
      )))
    it('GET status', () => response
      .then((res) => {
        assert.equal(res.status, 200);
      }));
  });
});
