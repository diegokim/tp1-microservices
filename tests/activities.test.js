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

  describe('Create and get activities', () => {
    let token;
    it('Create and then get activities should contain the created activity', () => authReq.registerRequest(newUser)
      .then(() => authReq.authenticateRequest(user))
      .then((res) => (token = res.body.token))
      .then(() => actReq.createActivity(activity, token))
      .then(() => actReq.getActivities(token))
      .then((res) => {
        const createdActivity = _.pick(res.body[0], ['nombre', 'descripcion', 'fechaInicio', 'horaInicio',
          'fechaFin', 'horaFin', 'categorias', 'prioridad', 'participantes', 'recordatorio', 'periodicidad',
          'estimacion', 'foto', 'tipo', 'beneficios', 'username']);
        assert.deepEqual(createdActivity, Object.assign(activity, { username }))
      })
    );
  });

  describe('Update activity', () => {
    let token;
    it('Create and then update activities should contain the updated activity', () => {
      return authReq.registerRequest(newUser)
      .then(() => authReq.authenticateRequest(user))
      .then((res) => (token = res.body.token))
      .then(() => actReq.createActivity(activity, token))
      .then(() => actReq.getActivities(token))
      .then((res) => {
        const id = res.body[0]._id;
        actReq.updateActivity(id, updatedActivity, token);
      })
      .then(() => actReq.getActivities(token))
      .then((res) => {
        const createdActivity = _.pick(res.body[0], ['nombre', 'descripcion', 'fechaInicio', 'horaInicio',
          'fechaFin', 'horaFin', 'categorias', 'prioridad', 'participantes', 'recordatorio', 'periodicidad',
          'estimacion', 'foto', 'tipo', 'beneficios', 'username']);
        assert.deepEqual(createdActivity, Object.assign(updatedActivity, { username }))
      })
      }
    );
  });

  describe('Delete activity', () => {
    let token;
    let token2;
    let activityId;
    it('Create and then delete activity should delete activity', () => Promise.resolve()
      .then(()    => authReq.registerRequest(newUser))
      .then(()    => authReq.authenticateRequest(user))
      .then((res) => (token = res.body.token))
      .then(()    => actReq.createActivity(activity, token))
      .then((res) => actReq.deleteActivity(res.body._id, token))
      .then(()    => actReq.getActivities(token))
      .then((res) => assert.deepEqual(res.body, []))
    );

    it('Create and then delete activity from other user should remove this user from this activity',
            ()    => Promise.resolve()
      .then(()    => authReq.registerRequest(newUser))
      .then(()    => authReq.authenticateRequest(user))
      .then((res) => (token = res.body.token))
      .then(()    => authReq.registerRequest(newUser2))
      .then((res) => (token2 = res.body.token))
      .then(()    => actReq.createActivity(activity, token))
      .then((res) => {
        activityId = res.body._id;
        return actReq.registerInActivity(activityId, token2)
      })
      .then(()    => actReq.getActivities(token2))
      .then((res) => {
        const participants = res.body[0].participantes;
        const expectedParticipants = activity.participantes;
        expectedParticipants.push(username2)
        assert.deepEqual(expectedParticipants, participants)
      })
      .then(()    => actReq.deleteActivity(activityId, token2))
      .then(()    => actReq.getActivities(token2))
      .then((res) => assert.deepEqual([], res.body))
      .then(()    => actReq.getActivities(token))
      .then((res) => assert.deepEqual(res.body.length, 1))
    );
  });

  describe('Register into activity', () => {
    let token;
    let token2;
    it('Create and then get activity should return the same', () => Promise.resolve()
      .then(()    => authReq.registerRequest(newUser))
      .then((res) => (token = res.body.token))
      .then(()    => authReq.registerRequest(newUser2))
      .then((res) => (token2 = res.body.token))
      .then(()    => actReq.createActivity(activity, token))
      .then((res) => {
        return actReq.registerInActivity(res.body._id, token)
        .then(() => actReq.registerInActivity(res.body._id, token2))
      })
      .then(()    => actReq.getActivities(token))
      .then((res) => {
        const newParticipants = res.body[0].participantes;
        const expectedParticipants = activity.participantes;
        expectedParticipants.push(username)
        expectedParticipants.push(username2)
        assert.deepEqual(expectedParticipants, newParticipants)
      })
      .then(()    => actReq.getActivities(token2))
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

    describe('fechaFin', () => {
      beforeEach(() => {
        searchParams = {
          fechaFin: '1/2/2017'
        };
        expectedActivities = [];
      });

      it('should return the expected activities', () => searchAndCompareActivities(searchParams, expectedActivities))
    })

    describe('fechaInicio', () => {
      beforeEach(() => {
        searchParams = {
          fechaInicio: '1/2/2017'
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
      .then(()    => authReq.registerRequest(newUser))
      .then(()    => authReq.authenticateRequest(user))
      .then((res) => (token = res.body.token))
      .then(()    => actReq.createActivity(activityList[0], token))
      .then(()    => actReq.createActivity(activityList[1], token))
      .then(()    => actReq.createActivity(activityList[2], token))
      .then(()    => actReq.createActivity(activityList[3], token))
      .then(()    => actReq.createActivity(activityList[4], token))
      .then((res) => actReq.searchActivities(searchParams, token))
      .then((res) => compareActivities(res.body, expectedActivities))
  });
});



const compareActivities = (givenAct, expectedAct) => {
  for (const activ of givenAct) {
    delete activ._id;
    delete activ.__v;
    delete activ.username;
  }

  assert.deepEqual(givenAct, expectedAct);
}
