const request = require('superagent');
const baseUrl = 'http://localhost:8080'; // VARIABLE DE CONF

const name = 'admin';
const username = 'superadmin';
const email = 'admin@gmail.com';
const password = 'admin';
const nacimiento = '10/10/1990'
const newUser = {
  name,
  username,
  email,
  password,
  nacimiento
};

let token;

module.exports.startMocking = function (database) {
  setTimeout(() => {  // ESTO ES UNA COCHINADA
    database.drop()
      .then(() => registerRequest(newUser))
      .then((res) => (token = res.body.token))
      .then(() => {
        const promises = [];
        for (const activity of activities) {
          promises.push(createActivity(activity, token))
        }
        return Promise.all(promises);
      })
  }, 2000);
}

const registerRequest = (regUser) => Promise.resolve(
  request.post(baseUrl + '/users/register')
    .set({'content-type': 'application/json'})
    .send(regUser)
);

const createActivity = (activity, token) => Promise.resolve(
  request.post(baseUrl + '/activities')
    .set({'content-type': 'application/json'})
    .set({'Authorization': token})
    .send(activity)
);

const activities = [
  {
    nombre: 'futbol',
	  descripcion: 'partido de futbol',
    fechaInicio: '10/7/2017',
    horaInicio: '12:00',
    fechaFin: '10/7/2017',
    horaFin: '13:00',
    categorias: ['futbol', 'pelota', 'racing'],
    prioridad: 'alta',
    participantes: ['diego', 'juanma', 'lautaro', 'hugo'],
    recordatorio: 'minguno',
    periodicidad: 1,
    estimacion: 3,
    lugar: 'lujan',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: [{
		  precio: 10,
		  descuento: 10,
		  descripcion: 'hiper descuento'
	  }]
  },
  {
    nombre: 'trabajo al fondo',
	  descripcion: 'alto trabajo al fondo',
    fechaInicio: '11/6/2017',
    horaInicio: '10:00',
    fechaFin: '11/6/2017',
    horaFin: '20:00',
    categorias: ['trabajo', 'muy duro', 'desempleo'],
    prioridad: 'baja',
    participantes: [],
    recordatorio: 'ninguno',
    periodicidad: 1,
    estimacion: 3,
    lugar: 'paris',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: [{
		  precio: 100,
		  descuento: 10,
		  descripcion: 'hiper descuento'
	  }]
  },
  {
    nombre: 'fiesta punchi punchi',
	  descripcion: 'la mejor fiesta',
    fechaInicio: '14/10/2017',
    horaInicio: '20:00',
    fechaFin: '14/10/2017',
    horaFin: '23:00',
    categorias: ['fiesta', 'locula', 'beer'],
    prioridad: 'alta',
    participantes: [],
    recordatorio: 'ninguno',
    periodicidad: 1,
    estimacion: 3,
    lugar: 'palermo',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: [{
		  precio: 100,
		  descuento: 10,
		  descripcion: 'hiper descuento'
	  }]
  }
]
