const request = require('superagent');
const baseUrl = require('./config.requests.js').baseUrl

module.exports.createObjective = (objective, token) => Promise.resolve(
  request.post(baseUrl + '/objectives')
    .set({'content-type': 'application/json'})
    .set({'Authorization': token})
    .send(objective)
);

module.exports.addActivityToObjective = (objectiveId, activityId, token) => Promise.resolve(
  request.put(baseUrl + '/objectives/' + objectiveId)
    .set({'content-type': 'application/json'})
    .set({'Authorization': token})
    .send({ activityId })
);

module.exports.getObjectives = (token) => Promise.resolve(
  request.get(baseUrl + '/objectives')
    .set({'Authorization': token})
    .send()
);

module.exports.deleteObjective = (objectiveId, token) => Promise.resolve(
  request.delete(baseUrl + '/objectives/' + objectiveId)
    .set({'content-type': 'application/json'})
    .set({'Authorization': token})
    .send()
)

module.exports.removeActivityFromObjective = (objectiveId, activityId, token) => Promise.resolve(
  request.delete(baseUrl + '/objectives/' + objectiveId + '/' + activityId)
  .set({'content-type': 'application/json'})
  .set({'Authorization': token})
  .send()
)
