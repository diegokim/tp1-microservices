/* eslint-disable */
const assert = require('chai').assert;
const request = require('superagent');
const DB = require('../wrappers/database');
const _ = require('lodash');

const baseUrl = 'http://localhost:8080'; // VARIABLE DE CONF

describe('Objective Tests', () => {
  const name = 'diego';
  const username = 'diego123';
  const username2 = 'lucas123';
  const email = 'diego@gmail.com';
  const password = 'kim';
  const password2 = 'ludueno';
  const nacimiento = '10/10/1990'
  const user = {
    username,
    password
  };
  const user2 = {
    username: username2,
    password: password2
  };
  const newUser = {
    name,
    username,
    email,
    password,
    nacimiento
  };
  const newUser2 = {
    name,
    username: username2,
    email,
    password: password2,
    nacimiento
  };
  const activity = {
    nombre: 'futbol',
	  descripcion: 'partido de futbol',
    fechaInicio: '10/7/2017',
    horaInicio: '12:00',
    fechaFin: '10/7/2017',
    horaFin: '13:00',
    categorias: ['futbol', 'pelota', 'racing'],
    prioridad: 'alta',
    participantes: ['diego', 'juanma', 'lautaro', 'hugo'],
    recordatorio: '9/7/2017',
    periodicidad: 1,
    estimacion: 2,
    foto: 'foto en base 64',
    tipo: 'act',
    beneficios: [{
		  precio: 10,
		  descuento: 10,
		  descripcion: ''
	  }]
  }

  const objective = {
  	nombre: 'Dejar de fumar',
  	descripcion: 'El pucho me esta haciendo mal',
  	categorias: ['Salud']
  }

	// Leave the database in a valid state
  beforeEach((done) => {
    DB.drop()
		.then(done)
		.catch(done);
  });


  describe('Create and get objectives', () => {
    let token;
    it('Create and then get objectives should contain the created objective', () => Promise.resolve()
      .then(()    => registerRequest(newUser))
      .then(()    => authenticateRequest(user))
      .then((res) => (token = res.body.token))
      .then(()    => createObjective(objective, token))
      .then(()    => getObjectives(token))
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
      .then(()    => registerRequest(newUser))
      .then(()    => authenticateRequest(user))
      .then((res) => token = res.body.token)
      .then(() => token ? Promise.resolve() : Promise.reject())
      .then(()    => createObjective(objective, token))
      .then((res) => (objId = res.body._id) )
      .then(() => createActivity(activity,token))
      .then((res) => (activityId = res.body._id) )
      .then(() => addActivityToObjective(objId, activityId, token) )
      .then(()    => getObjectives(token))
      .then((res) => {
        const createdObjective = _.pick(res.body[0], ['nombre', 'descripcion', 'categorias', 'actividades', 'username']);
        assert.deepEqual(createdObjective, Object.assign(objective, { username }, {actividades: [activityId]}));
      })
    );
  });


  describe('Delete objective', () => {
    let token;
    it('Creating, getting and deleting an objective should make the next call to get objectives return an empty array', () => Promise.resolve()
      .then(()    => registerRequest(newUser))
      .then(()    => authenticateRequest(user))
      .then((res) => (token = res.body.token))
      .then(()    => createObjective(objective, token))
      .then(()    => getObjectives(token))
      .then((res) => {
        const createdObjectiveId = res.body[0]._id;
        deleteObjective(createdObjectiveId,token)})
      .then(()    => getObjectives(token))
      .then((res) => {
        const createdObjectives = res.body
        console.log(createdObjectives)
        assert.equal(createdObjectives.length, 0);
      })
    );
  });
//  End of Test case
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

const createActivity = (activity, token) => Promise.resolve(
  request.post(baseUrl + '/activities')
    .set({'content-type': 'application/json'})
    .set({'Authorization': token})
    .send(activity)
);

const createObjective = (objective, token) => Promise.resolve(
  request.post(baseUrl + '/objectives')
    .set({'content-type': 'application/json'})
    .set({'Authorization': token})
    .send(objective)
);

const addActivityToObjective = (objectiveId, activityId, token) => Promise.resolve(
  request.put(baseUrl + '/objectives/' + objectiveId)
    .set({'content-type': 'application/json'})
    .set({'Authorization': token})
    .send({ activityId })
);

const getObjectives = (token) => Promise.resolve(
  request.get(baseUrl + '/objectives')
    .set({'Authorization': token})
    .send()
);

const getActivities = (token) => Promise.resolve(
  request.get(baseUrl + '/activities')
    .set({'Authorization': token})
    .send()
);

const deleteObjective = (objectiveId, token) => Promise.resolve(
  request.delete(baseUrl + '/objectives/' + objectiveId )
    .set({'content-type': 'application/json'})
    .set({'Authorization': token})
    .send()
)

const registerInActivity = (id, token) => Promise.resolve(
  request.put(baseUrl + '/activities/' + id + '/register')
    .set({'content-type': 'application/json'})
    .set({'Authorization': token})
    .send()
);
