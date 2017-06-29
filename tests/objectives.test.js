/* eslint-disable */
const assert = require('chai').assert;
const DB = require('../wrappers/database');
const _ = require('lodash');
const prefabs = require('./requests/prefabs.requests.js')
const authReq = require('./requests/auth.requests.js')
const actReq = require('./requests/activities.requests.js')
const objReq = require('./requests/objectives.requests.js')


describe('Objective Tests', () => {

  const objective = prefabs.objective;
  const user = prefabs.user;
  const username = user.username;
  const user2 = prefabs.user2;
  const username2 = user2.username;
  const newUser = prefabs.newUser;
  const newUser2 = prefabs.newUser2;
  const activity = prefabs.activity;
  const updatedActivity = prefabs.updatedActivity;


	// Leave the database in a valid state
  beforeEach((done) => {
    DB.drop()
		.then(done)
		.catch(done);
  });


  describe('Create and get objectives', () => {
    let token;
    it('Create and then get objectives should contain the created objective', () => Promise.resolve()
      .then(()    => authReq.registerRequest(newUser))
      .then(()    => authReq.authenticateRequest(user))
      .then((res) => (token = res.body.token))
      .then(()    => objReq.createObjective(objective, token))
      .then(()    => objReq.getObjectives(token))
      .then((res) => {
        const createdObjective = _.pick(res.body[0], ['nombre', 'descripcion', 'categorias', 'actividades', 'username']);
        assert.deepEqual(createdObjective, Object.assign(objective, { username }, {actividades: []}));
      })
    );
  });

  describe('Activity and objective binding', () => {
    let token;
    let objId;
    let activityId;
    it('Create and then get objectives should contain the created objective', () => Promise.resolve()
      .then(()    => authReq.registerRequest(newUser))
      .then(()    => authReq.authenticateRequest(user))
      .then((res) => token = res.body.token)
      .then(() => token ? Promise.resolve() : Promise.reject())
      .then(()    => objReq.createObjective(objective, token))
      .then((res) => (objId = res.body._id) )
      .then(() => actReq.createActivity(activity,token))
      .then((res) => (activityId = res.body._id) )
      .then(() => objReq.addActivityToObjective(objId, activityId, token) )
      .then(()    => objReq.getObjectives(token))
      .then((res) => {
        const createdObjective = _.pick(res.body[0], ['nombre', 'descripcion', 'categorias', 'actividades', 'username']);
        assert.deepEqual(createdObjective, Object.assign(objective, { username }, {actividades: [activityId]}));
      })
    );
  });

  describe('Delete objective', () => {
    let token;
    it('Creating, getting and deleting an objective should make the next call to get objectives return an empty array', () => Promise.resolve()
      .then(()    => authReq.registerRequest(newUser))
      .then(()    => authReq.authenticateRequest(user))
      .then((res) => (token = res.body.token))
      .then(() => token ? Promise.resolve() : Promise.reject())
      .then(()    => objReq.createObjective(objective, token))
      .then(()    => objReq.getObjectives(token))
      .then((res) => {
        const createdObjectiveId = res.body[0]._id;
        return objReq.deleteObjective(createdObjectiveId,token)})
      .then(()    => objReq.getObjectives(token))
      .then((res) => {
        const createdObjectives = res.body
        assert.equal(createdObjectives.length, 0);
      })
    );
  });

  describe('Remove activity from objective', () => {
    let token;
    let objId;
    let activityId;
    it('should be updated at the next getObjectives', () => Promise.resolve()
      .then(()    => authReq.registerRequest(newUser))
      .then(()    => authReq.authenticateRequest(user))
      .then((res) => token = res.body.token)
      .then(() => token ? Promise.resolve() : Promise.reject())
      .then(()    => objReq.createObjective(objective, token))
      .then((res) => (objId = res.body._id) )
      .then(() => objId ? Promise.resolve() : Promise.reject())
      .then(() => actReq.createActivity(activity,token))
      .then((res) => (activityId = res.body._id) )
      .then(() => objReq.addActivityToObjective(objId, activityId, token) )
      .then(() => objReq.removeActivityFromObjective(objId, activityId, token))
      .then(()    => objReq.getObjectives(token))
      .then((res) => {
        const createdObjective = _.pick(res.body[0], ['nombre', 'descripcion', 'categorias', 'actividades', 'username']);
        assert.deepEqual(createdObjective, Object.assign(objective, { username }, {actividades: []}));
      })
    );
  });

  describe('Remove activity should remove it from objetive', () => {
    let token;
    let objId;
    let activityId;
    it('should be updated at the next getObjectives', () => Promise.resolve()
      .then(()    => authReq.registerRequest(newUser))
      .then(()    => authReq.authenticateRequest(user))
      .then((res) => token = res.body.token)
      .then(()    => token ? Promise.resolve() : Promise.reject())
      .then(()    => objReq.createObjective(objective, token))
      .then((res) => (objId = res.body._id) )
      .then(()    => objId ? Promise.resolve() : Promise.reject())
      .then(()    => actReq.createActivity(activity,token))
      .then((res) => (activityId = res.body._id))
      .then(()    => actReq.deleteActivity(activityId, token))
      .then(()    => objReq.getObjectives(token))
      .then((res) => {
        const createdObjective = _.pick(res.body[0], ['nombre', 'descripcion', 'categorias', 'actividades', 'username']);
        assert.deepEqual(createdObjective, Object.assign(objective, { username }, {actividades: []}));
      })
      .then(() => actReq.getActivities(token))
      .then((res) => {
        const activities = res.body;
        assert.isTrue(activities.length === 0)
      })
    );
  });

//  End of Test case
});
