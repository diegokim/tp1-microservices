/* eslint-disable */
const assert = require('chai').assert;
const request = require('superagent');
const DB = require('../wrappers/database');
const _ = require('lodash');

const baseUrl = 'http://localhost:8080'; // VARIABLE DE CONF

describe('Integration tests', () => {
  const name = 'diego';
  const username = 'diego123';
  const username2 = 'lucas123';
  const email = 'diego@gmail.com';
  const password = 'kim';
  const password2 = 'ludueno';
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
    password
  };
  const newUser2 = {
    name,
    username: username2,
    email,
    password: password2
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
    it('Create and then get activities should contain the created activity', () => Promise.resolve()
      .then(()    => registerRequest(newUser))
      .then(()    => authenticateRequest(user))
      .then((res) => (token = res.body.token))
      .then(()    => createActivity(activity, token))
      .then(()    => getActivities(token))
      .then((res) => {
        const createdActivity = _.pick(res.body[0], ['nombre', 'descripcion', 'fechaInicio', 'horaInicio',
          'fechaFin', 'horaFin', 'categorias', 'prioridad', 'participantes', 'recordatorio', 'periodicidad',
          'estimacion', 'objetivo', 'tipo', 'beneficios', 'username']);
        assert.deepEqual(createdActivity, Object.assign(activity, { username }))
      })
    );
  });

  describe('Delete activity', () => {
    let token;
    it('Create and then delete activity should delete activity', () => Promise.resolve()
      .then(()    => registerRequest(newUser))
      .then(()    => authenticateRequest(user))
      .then((res) => (token = res.body.token))
      .then(()    => createActivity(activity, token))
      .then((res) => deleteActivity(res.body._id, token))
      .then(()    => getActivities(token))
      .then((res) => assert.deepEqual(res.body, []))
    );
  });

  describe('Register into activity', () => {
    let token;
    let token2;
    it('Create and then get activity should return the same', () => Promise.resolve()
      .then(()    => registerRequest(newUser))
      .then((res) => (token = res.body.token))
      .then(()    => registerRequest(newUser2))
      .then((res) => (token2 = res.body.token))
      .then(()    => createActivity(activity, token))
      .then((res) => {
        return registerInActivity(res.body._id, token)
        .then(() => registerInActivity(res.body._id, token2))
      })
      .then(()    => getActivities(token))
      .then((res) => {
        const newParticipants = res.body[0].participantes;
        const expectedParticipants = activity.participantes;
        expectedParticipants.push(username)
        expectedParticipants.push(username2)
        assert.deepEqual(expectedParticipants, newParticipants)
      })
      .then(()    => getActivities(token2))
      .then((res) => {
        const newParticipants = res.body[0].participantes;
        assert.deepEqual( activity.participantes, newParticipants)
      })
    );
  });

  describe('Search activities', () => {
    let searchParams;
    let expectedActivities;
    const activityList = [
      Object.assign({}, activity, { fechaInicio: '1/1/2017', fechaFin: '1/1/2017', nombre: 'act futbol', tipo: 'privada', descripcion: 'partido de futbol', categorias: ['futbol', 'pelota'] }),
      Object.assign({}, activity, { fechaInicio: '2/2/2017', fechaFin: '2/2/2017', nombre: 'act fiesta', tipo: 'publica',descripcion: 'fiesta punchi punchi', categorias: ['fiesta', 'locura', 'alcohol'] }),
      Object.assign({}, activity, { fechaInicio: '3/3/2017', fechaFin: '3/3/2017', nombre: 'act zapatillas', tipo: 'publica',descripcion: 'compra zapatillas ML trabajo', categorias: ['zapatillas', 'moda', 'ML'] }),
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

      it('should return the expected activities', () => searchAndCompareActivities(searchParams, expectedActivities))
    })

    describe('fechaDesde', () => {
      beforeEach(() => {
        searchParams = {
          fechaDesde: '1/2/2017'
        };
        expectedActivities = [activityList[1], activityList[2], activityList[3], activityList[4]];
      });

      it('should return the expected activities', () => searchAndCompareActivities(searchParams, expectedActivities))
    })

    describe('texto (1)', () => {
      beforeEach(() => {
        searchParams = {
          texto: 'racing'
        };
        expectedActivities = [activityList[4]];
      });

      it('should return the expected activities', () => searchAndCompareActivities(searchParams, expectedActivities))
    })

    describe('texto (2)', () => {
      beforeEach(() => {
        searchParams = {
          texto: 'no-match'
        };
        expectedActivities = [];
      });

      it('should return the expected activities', () => searchAndCompareActivities(searchParams, expectedActivities))
    })

    describe('texto matching public and private activities', () => {
      beforeEach(() => {
        searchParams = {
          texto: 'futbol'
        };
        expectedActivities = [activityList[4]];
      });

      it('should return the expected activities', () => searchAndCompareActivities(searchParams, expectedActivities))
    })

    describe('categories (1)', () => {
      beforeEach(() => {
        searchParams = {
          categorias: ['alcohol', 'desempleo']
        };
        expectedActivities = [activityList[1], activityList[3]];
      });

      it('should return the expected activities', () => searchAndCompareActivities(searchParams, expectedActivities))
    })

    describe('categories (2)', () => {
      beforeEach(() => {
        searchParams = {
          categorias: ['trabajo']
        };
        expectedActivities = [activityList[2], activityList[3]];
      });

      it('should return the expected activities', () => searchAndCompareActivities(searchParams, expectedActivities))
    })

    describe('random', () => {
      beforeEach(() => {
        searchParams = {
          tipo: 'random'
        };
        expectedActivities = [activityList[0], activityList[1], activityList[2], activityList[3], activityList[4]];
      });

      it('should return the expected activities', () => searchAndCompareActivities(searchParams, expectedActivities))
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
const registerRequest = (regUser) => Promise.resolve(
  request.post(baseUrl + '/users/register')
    .set({'content-type': 'application/json'})
    .send(regUser)
);

const compareActivities = (givenAct, expectedAct) => {
  for (const activ of givenAct) {
    delete activ._id;
    delete activ.__v;
    delete activ.username;
  }

  assert.deepEqual(givenAct, expectedAct);
}

const authenticateRequest = (authUser) => Promise.resolve(
  request.post(baseUrl + '/users/authenticate')
    .set({'content-type': 'application/json'})
    .send(authUser)
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

const registerInActivity = (id, token) => Promise.resolve(
  request.put(baseUrl + '/activities/' + id + '/register')
    .set({'content-type': 'application/json'})
    .set({'Authorization': token})
    .send()
);

const deleteActivity = (id, token) => Promise.resolve(
  request.delete(baseUrl + '/activities/' + id)
    .set({'content-type': 'application/json'})
    .set({'Authorization': token})
    .send()
);
