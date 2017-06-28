const assert = require('chai').assert;
const request = require('superagent');
const baseUrl = 'http://localhost:8080';

describe('Integration status tests', () => {
	// Leave the database in a valid state
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
