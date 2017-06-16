const assert = require('chai').assert;
const request = require('superagent');
const DB = require('../wrappers/database');
const _ = require('lodash');

// eslint-disable-next-line
const server = require('../app.js');    // TENEMOS QUE BUSCAR LA FORMA DE NO LEVANTAR LA APLICACION ASI

const baseUrl = 'http://localhost:8080'; // VARIABLE DE CONF

describe('Integration tests', () => {
  const name = 'diego';
  const username = 'username';
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

	// Leave the database in a valid state
  beforeEach((done) => {
    DB.drop()
		.then(done)
		.catch(done);
  });

  describe('Create and get activities', () => {
    let token;
    it('Create and then get activities should contain the created activity', () => registerRequest(newUser)
      .then(() => authenticateRequest(user))
      .then((res) => (token = res.body.token))
      .then(() => createActivity(activity, token))
      .then(() => getActivities(token))
      .then((res) => {
        const createdActivity = _.pick(res.body[0], ['nombre', 'descripcion', 'fechaInicio', 'horaInicio',
          'fechaFin', 'horaFin', 'categorias', 'prioridad', 'participantes', 'recordatorio', 'periodicidad',
          'estimacion', 'objetivo', 'tipo', 'beneficios', 'username']);
        assert.deepEqual(createdActivity, Object.assign(activity, { username }))
      })
    );
  });

  // describe('Create and get activity', () => {
  //   let token;
  //   it('Create and then get activity should return the same', () => registerRequest(newUser)
  //     .then(() => authenticateRequest(user))
  //     .then((res) => (token = res.body.token))
  //     .then(() => createActivity(activity, token))
  //     .then((res) => getActivity(res.body.id, token))
  //     .then((activ) => assert.include(activ, activity))
  //   );
  // });
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

const getActivities = (token) => Promise.resolve(
  request.get(baseUrl + '/activities')
    .set({'Authorization': token})
    .send()
);

// const getActivity = (id, token) => Promise.resolve(
//   request.get(baseUrl + '/activities/' + id)
//     .set({'content-type': 'application/json'})
//     .set({'Authorization': token})
//     .send()
// );
