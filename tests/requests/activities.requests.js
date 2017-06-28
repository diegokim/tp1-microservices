const request = require('superagent');
const baseUrl = require('./config.requests.js').baseUrl

module.exports.createActivity = (activity, token) => Promise.resolve(
  request.post(baseUrl + '/activities')
    .set({'content-type': 'application/json'})
    .set({'Authorization': token})
    .send(activity)
);

module.exports.getActivities = (token) => Promise.resolve(
  request.get(baseUrl + '/activities')
    .set({'Authorization': token})
    .send()
);

module.exports.updateActivity = (id, activity, token) => Promise.resolve(
  request.put(baseUrl + '/activities/' + id)
    .set({'content-type': 'application/json'})
    .set({'Authorization': token})
    .send(activity)
);

module.exports.searchActivities = (searchParams, token) => Promise.resolve(
  request.post(baseUrl + '/activities/search')
    .set({'content-type': 'application/json'})
    .set({'Authorization': token})
    .send(searchParams)
);

module.exports.registerInActivity = (id, token) => Promise.resolve(
  request.put(baseUrl + '/activities/' + id + '/register')
    .set({'content-type': 'application/json'})
    .set({'Authorization': token})
    .send()
);

module.exports.deleteActivity = (id, token) => Promise.resolve(
  request.delete(baseUrl + '/activities/' + id)
    .set({'content-type': 'application/json'})
    .set({'Authorization': token})
    .send()
);
