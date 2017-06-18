/* eslint-disable */
const assert = require('chai').assert;
const request = require('superagent');
const DB = require('../wrappers/database');
const _ = require('lodash');

const baseUrl = 'http://localhost:8080'; // VARIABLE DE CONF

describe('Integration tests', () => {
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

  describe('Search activities', () => {
    let searchParams;
    let expectedActivities;
    const activityList = [
      Object.assign({}, activity, { fechaInicio: '1/1/2017', fechaFin: '1/1/2017', nombre: 'act futbol', tipo: 'privada', descripcion: 'partido de futbol', categorias: ['futbol', 'pelota'] }),
      Object.assign({}, activity, { fechaInicio: '2/2/2017', fechaFin: '2/2/2017', nombre: 'act fiesta', tipo: 'publica',descripcion: 'fiesta punchi punchi', categorias: ['fiesta', 'locura', 'alcohol'] }),
      Object.assign({}, activity, { fechaInicio: '3/3/2017', fechaFin: '3/3/2017', nombre: 'act zapatillas', tipo: 'publica',descripcion: 'compra zapatillas ML', categorias: ['zapatillas', 'moda', 'ML'] }),
      Object.assign({}, activity, { fechaInicio: '4/4/2017', fechaFin: '4/4/2017', nombre: 'act trabajo', tipo: 'publica',descripcion: 'trabajo duro como un esclavo', categorias: ['trabajo', 'desempleo'] }),
      Object.assign({}, activity, { fechaInicio: '5/5/2017', fechaFin: '5/5/2017', nombre: 'act racing', tipo: 'publica',descripcion: 'partido de racing', categorias: ['futbol', 'racing'] })
    ]

    describe('fechaHasta', () => {
      beforeEach(() => {
        searchParams = {
          fechaHasta: '1/2/2017'
        };
        expectedActivities = [];
      });

      it('Should return the expected activities', () => searchAndCompareActivities(searchParams, expectedActivities))
    })

    describe('fechaDesde', () => {
      beforeEach(() => {
        searchParams = {
          fechaDesde: '1/2/2017'
        };
        expectedActivities = [activityList[1], activityList[2], activityList[3], activityList[4]];
      });

      it('Should return the expected activities', () => searchAndCompareActivities(searchParams, expectedActivities))
    })

    describe('texto', () => {
      beforeEach(() => {
        searchParams = {
          texto: 'racing'
        };
        expectedActivities = [activityList[4]];
      });

      it('Should return the expected activities', () => searchAndCompareActivities(searchParams, expectedActivities))
    })

    describe('texto matching public and private activities', () => {
      beforeEach(() => {
        searchParams = {
          texto: 'futbol'
        };
        expectedActivities = [activityList[4]];
      });

      it('Should return the expected activities', () => searchAndCompareActivities(searchParams, expectedActivities))
    })

    const searchAndCompareActivities = (searchParams, expectedActivities) => Promise.resolve()
      .then(()    => registerRequest(newUser))
      .then(()    => authenticateRequest(user))
      .then((res) => (token = res.body.token))
      .then(()    => createActivity(activityList[0], token))
      .then(()    => createActivity(activityList[1], token))
      .then(()    => createActivity(activityList[2], token))
      .then(()    => createActivity(activityList[3], token))
      .then(()    => createActivity(activityList[4], token))
      .then((res) => searchActivities(searchParams, token))
      .then((res) => compareActivities(res.body, expectedActivities))
  });
});

//  AUXILIAR FUNCTIONS
const compareActivities = (givenAct, expectedAct) => {
  for (const activ of givenAct) {
    delete activ._id;
    delete activ.__v;
    delete activ.username;
  }

  assert.deepEqual(givenAct, expectedAct);
}

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

const searchActivities = (searchParams, token) => Promise.resolve(
  request.get(baseUrl + '/activities/search')
    .set({'content-type': 'application/json'})
    .set({'Authorization': token})
    .send(searchParams)
);
