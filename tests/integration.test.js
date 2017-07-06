/* eslint-disable */
const assert = require('chai').assert;
const request = require('superagent');
const DB = require('../wrappers/database');
const _ = require('lodash');
const prefabs = require('./requests/prefabs.requests.js')
const authReq = require('./requests/auth.requests.js')
const actReq = require('./requests/activities.requests.js')

const baseUrl = 'http://localhost:8080'; // VARIABLE DE CONF

describe('Integration tests', () => {
  const user = prefabs.user;
  const user2 = prefabs.user2;

  const username = user.username;
  const username2 = user2.username;

  const newUser = prefabs.newUser;
  const newUser2 = prefabs.newUser2;

  const activity = prefabs.activity;
  activity.participantes = [];
  const activity2 = Object.assign({}, prefabs.activity);
  activity2.participantes = [];
  activity2.nombre = 'fiesta';
  activity2.tipo = 'privada';

  const updatedActivity = prefabs.updatedActivity;
  delete activity.objetivo;

  const activityFields = ['nombre', 'descripcion', 'fechaInicio', 'horaInicio',
    'fechaFin', 'horaFin', 'categorias', 'prioridad', 'participantes', 'recordatorio', 'periodicidad',
    'estimacion', 'foto', 'tipo', 'beneficios', 'username', 'completada'];

	// Leave the database in a valid state
  beforeEach((done) => {
    DB.drop()
		.then(done)
		.catch(done);
  });

  describe('Integration', () => {
    let token1;
    let token2;
    let act1;
    let act2;
    it('Integration with users', () => Promise.resolve()
      // Autenticar
      .then(() => authReq.registerRequest(newUser))
      .then(() => authReq.authenticateRequest(user))
      .then((res) => (token1 = res.body.token))
      .then(() => authReq.registerRequest(newUser2))
      .then(() => authReq.authenticateRequest(user2))
      .then((res) => (token2 = res.body.token))
      // Crear actividades publica para 1
      .then(() => actReq.createActivity(activity, token1))
      .then(() => actReq.getActivities(token1))
      .then((res) => {
        act1 = res.body[0]._id;
        const createdActivity = _.pick(res.body[0], activityFields);
        assert.deepEqual(createdActivity, Object.assign({}, activity, { username }))
      })
      // Crear actividad privada para 2
      .then(() => actReq.createActivity(activity2, token2))
      .then(() => actReq.getActivities(token2))
      .then((res) => {
        act2 = res.body[0]._id;
        const createdActivity = _.pick(res.body[0], activityFields);
        assert.deepEqual(createdActivity, Object.assign({}, activity2, { username: username2 }))
      })
      // Buscar actividad solo trae la 1
      .then((res) => actReq.searchActivities({ tipo: 'random' }, token2))
      .then((res) => {
        const searchActivity = _.pick(res.body[0], activityFields);
        assert.deepEqual(searchActivity, Object.assign({}, activity, { username }))
      })
      // Registrar en actividad 1 a usuario 2
      .then(() => actReq.registerInActivity(act1, token2))
      .then(() => actReq.getActivities(token2))
      .then((res) => {
        assert.equal(res.body.length, 2)
      })
      // Borrar actividad 1 borra la actividad de los dos usuarios
      .then(() => actReq.deleteActivity(act1, token1))
      .then(() => actReq.getActivities(token2))
      .then((res) => {
        assert.equal(res.body.length, 1)
      })
      .then(() => actReq.getActivities(token1))
      .then((res) => {
        assert.equal(res.body.length, 0)
      })
      // Updetear una actividad y agregar participantes, agrega a los demas
      .then((res) => {
        const updatedActivity = Object.assign({}, activity2, { participantes: [username] })
        return actReq.updateActivity(act2, updatedActivity, token2);
      })
      .then(() => actReq.getActivities(token1))
      .then((res) => {
        assert.equal(res.body.length, 1)
      })
    );
  });
});
