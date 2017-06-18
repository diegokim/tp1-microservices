/* eslint-disable */
const assert = require('chai').assert;
const request = require('superagent');
const DB = require('../wrappers/database');
const _ = require('lodash');

const baseUrl = 'http://localhost:8080'; // VARIABLE DE CONF

describe('Objective tests', () => {
  const name = 'diego';
  const username = 'diego123';
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
    objetivo: '5 partidos',
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
  	categorias: ['Salud'],
  	actividades: []
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
        assert.deepEqual(createdObjective, Object.assign(objective, { username }));
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

const registerInActivity = (id, token) => Promise.resolve(
  request.put(baseUrl + '/activities/' + id + '/register')
    .set({'content-type': 'application/json'})
    .set({'Authorization': token})
    .send()
);
