const request = require('superagent');
const baseUrl = 'http://localhost:8080'; // VARIABLE DE CONF

const name = 'juanma';
const username = 'juanma';
const email = 'juanmafc25@gmail.com';
const password = '12345';
const nacimiento = '12/9/1993'
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

const activities = [ // ACTIVIDADES FUTBOL
  {
    nombre: 'Regar las plantas',
	  descripcion: '   ',
    fechaInicio: '10/7/1900',
    horaInicio: '12:00',
    fechaFin: '10/7/1900',
    horaFin: '13:00',
    categorias: ['13434768_Hogar'],
    prioridad: 'alta',
    participantes: [],
    recordatorio: 'minguno',
    periodicidad: 0,
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
    nombre: 'Regar las plantas',
	  descripcion: '   ',
    fechaInicio: '10/7/1900',
    horaInicio: '12:00',
    fechaFin: '10/7/1900',
    horaFin: '13:00',
    categorias: ['13434768_Hogar'],
    prioridad: 'alta',
    participantes: [],
    recordatorio: 'minguno',
    periodicidad: 0,
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
    nombre: 'Informe',
	  descripcion: '   ',
    fechaInicio: '10/7/1900',
    horaInicio: '12:00',
    fechaFin: '10/7/1900',
    horaFin: '13:00',
    categorias: ['8444159_Trabajo'],
    prioridad: 'alta',
    participantes: [],
    recordatorio: 'minguno',
    periodicidad: 0,
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
  //ACTIVIDADES 1 A 7
  {
    nombre: 'Actividad 1',
	  descripcion: 'Descripcion 1',
    fechaInicio: '14/7/1900',
    horaInicio: '10:00',
    fechaFin: '30/9/1900',
    horaFin: '20:00',
    categorias: [],
    prioridad: 'alta',
    participantes: [],
    recordatorio: 'ninguno',
    periodicidad: 0,
    estimacion: 3,
    lugar: 'Lanus. Sarmiento 450',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: []
  },
  {
    nombre: 'Actividad 2',
	  descripcion: 'Descripcion 2',
    fechaInicio: '14/7/1900',
    horaInicio: '10:00',
    fechaFin: '30/9/1900',
    horaFin: '20:00',
    categorias: [],
    prioridad: 'alta',
    participantes: [],
    recordatorio: 'ninguno',
    periodicidad: 0,
    estimacion: 3,
    lugar: 'Lanus. Sarmiento 450',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: []
  },
  {
    nombre: 'Actividad 3',
	  descripcion: 'Descripcion 3',
    fechaInicio: '14/7/1900',
    horaInicio: '10:00',
    fechaFin: '30/9/1900',
    horaFin: '20:00',
    categorias: [],
    prioridad: 'alta',
    participantes: [],
    recordatorio: 'ninguno',
    periodicidad: 0,
    estimacion: 3,
    lugar: 'Lanus. Sarmiento 450',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: []
  },
  {
    nombre: 'Actividad 4',
	  descripcion: 'Descripcion 4',
    fechaInicio: '14/7/1900',
    horaInicio: '10:00',
    fechaFin: '30/9/1900',
    horaFin: '20:00',
    categorias: [],
    prioridad: 'alta',
    participantes: [],
    recordatorio: 'ninguno',
    periodicidad: 0,
    estimacion: 3,
    lugar: 'Lanus. Sarmiento 450',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: []
  },
  {
    nombre: 'Actividad 5',
	  descripcion: 'Descripcion 5',
    fechaInicio: '14/7/1900',
    horaInicio: '10:00',
    fechaFin: '30/9/1900',
    horaFin: '20:00',
    categorias: [],
    prioridad: 'alta',
    participantes: [],
    recordatorio: 'ninguno',
    periodicidad: 0,
    estimacion: 3,
    lugar: 'Lanus. Sarmiento 450',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: []
  },
  {
    nombre: 'Actividad 6',
	  descripcion: 'Descripcion 6',
    fechaInicio: '14/7/1900',
    horaInicio: '10:00',
    fechaFin: '30/9/1900',
    horaFin: '20:00',
    categorias: [],
    prioridad: 'alta',
    participantes: [],
    recordatorio: 'ninguno',
    periodicidad: 0,
    estimacion: 3,
    lugar: 'Lanus. Sarmiento 450',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: []
  },
  {
    nombre: 'Actividad 7',
	  descripcion: 'Descripcion 7',
    fechaInicio: '14/7/1900',
    horaInicio: '10:00',
    fechaFin: '30/9/1900',
    horaFin: '20:00',
    categorias: [],
    prioridad: 'alta',
    participantes: [],
    recordatorio: 'ninguno',
    periodicidad: 0,
    estimacion: 3,
    lugar: 'Lanus. Sarmiento 450',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: []
  }
]
