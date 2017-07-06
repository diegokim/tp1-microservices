const request = require('superagent');
const baseUrl = 'http://localhost:8080'; // VARIABLE DE CONF

const superAdmin = {
  name: 'admin',
  username: 'superadmin',
  email:  'admin@gmail.com',
  password: '12345',
  nacimiento: '10/10/1990'
};

const juanma = {
  name: 'juanma',
  username: 'juanma',
  email: 'juanmafc25@gmail.com',
  password: '12345',
  nacimiento: '10/10/1990'
};

const diego = {
  name: 'diego',
  username: 'diego',
  email: 'diego@gmail.com',
  password: '12345',
  nacimiento: '10/10/1990'
};

let tokenJuanma;
let tokenSuperAdmin;
let tokenDiego;

module.exports.startMocking = function (database) {
  setTimeout(() => {  // ESTO ES UNA COCHINADA
    database.drop()
      .then(() => registerRequest(superAdmin))
      .then((res) => (tokenSuperAdmin = res.body.token))
      .then(() => {
        const promises = [];
        for (const activity of activities) {
          promises.push(createActivity(activity, tokenSuperAdmin))
        }
        return Promise.all(promises);
      })
      .then(() => registerRequest(juanma))
      .then((res) => (tokenJuanma = res.body.token))
      .then(() => {
        const promises = [];
        for (const activity of activitiesJuanma) {
          promises.push(createActivity(activity, tokenJuanma))
        }
        return Promise.all(promises);
      })
      .then(() => registerRequest(diego))
      .then((res) => (tokenDiego = res.body.token))
  }, 5000);
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
    nombre: 'Partido de Futbol',
	  descripcion: 'partido de futbol con amigos',
    fechaInicio: '10/7/2017',
    horaInicio: '12:00',
    fechaFin: '10/7/2017',
    horaFin: '13:00',
    categorias: ['futbol', 'pelota'],
    prioridad: 'alta',
    participantes: [],
    recordatorio: '',
    periodicidad: 1,
    estimacion: 3,
    lugar: 'lujan',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: [{
		  precio: 10,
		  descuento: 10,
		  descripcion: 'hiper descuento'
	  }],
    completada: false
  },
  {
    nombre: 'Translado a Racing vs Barcelona',
	  descripcion: 'partido de futbol',
    fechaInicio: '22/8/2017',
    horaInicio: '22:00',
    fechaFin: '22/8/2017',
    horaFin: '24:00',
    categorias: ['futbol', 'partido', 'racing'],
    prioridad: 'alta',
    participantes: [],
    recordatorio: '',
    periodicidad: 1,
    estimacion: 3,
    lugar: 'Avellaneda',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: [{
		  precio: 500,
		  descuento: 20,
		  descripcion: 'descuento'
	  }],
    completada: false
  },
  {
    nombre: 'Entradas Racing vs Godoy Cruz',
	  descripcion: 'partido de futbol',
    fechaInicio: '24/12/2017',
    horaInicio: '20:00',
    fechaFin: '24/12/2017',
    horaFin: '24:00',
    categorias: ['futbol', 'partido', 'racing', 'godoy cruz'],
    prioridad: 'alta',
    participantes: [],
    recordatorio: '',
    periodicidad: 1,
    estimacion: 3,
    lugar: 'Avellaneda',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: [{
		  precio: 300,
		  descuento: 20,
		  descripcion: 'descuento'
	  }],
    completada: false
  },

  // ACTIVIDADES TRABAJO
  {
    nombre: 'Oferta trabajo: analista',
	  descripcion: 'Trabajo de analista en MauDB',
    fechaInicio: '20/7/2017',
    horaInicio: '10:00',
    fechaFin: '20/7/2017',
    horaFin: '20:00',
    categorias: ['trabajo', 'desempleo'],
    prioridad: 'baja',
    participantes: [],
    recordatorio: '',
    periodicidad: 1,
    estimacion: 3,
    lugar: 'Capital Federal',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: [{
		  precio: 100,
		  descuento: 10,
		  descripcion: 'hiper descuento'
	  }],
    completada: false
  },
  {
    nombre: 'Oferta trabajo: Ingeniero en sistema',
	  descripcion: 'Presentar curriculum.',
    fechaInicio: '30/8/2017',
    horaInicio: '10:00',
    fechaFin: '30/8/2017',
    horaFin: '21:00',
    categorias: ['trabajo', 'ingeniero', 'buen sueldo'],
    prioridad: 'alta',
    participantes: [],
    recordatorio: '',
    periodicidad: 1,
    estimacion: 3,
    lugar: 'Chicago 960. La Plata',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: [{
		  precio: 100,
		  descuento: 10,
		  descripcion: 'hiper descuento'
	  }],
    completada: false
  },
  {
    nombre: 'Oferta Trabajo: cuidar a mis hijos',
	  descripcion: 'cuidar a mis hijos al mediodia',
    fechaInicio: '20/8/2017',
    horaInicio: '10:00',
    fechaFin: '20/12/2017',
    horaFin: '14:00',
    categorias: ['trabajo', 'hijos', 'cuidar'],
    prioridad: 'baja',
    participantes: [],
    recordatorio: '',
    periodicidad: 12,
    estimacion: 3,
    lugar: 'Basualdo 345',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: [{
		  precio: 100,
		  descuento: 10,
		  descripcion: 'hiper descuento'
	  }],
    completada: false
  },

  // ACTIVIDADES FIESTA
  {
    nombre: 'Fiesta punchi punchi',
	  descripcion: 'la mejor fiesta',
    fechaInicio: '14/10/2017',
    horaInicio: '20:00',
    fechaFin: '14/10/2017',
    horaFin: '23:00',
    categorias: ['fiesta', 'locula', 'beer'],
    prioridad: 'alta',
    participantes: [],
    recordatorio: '',
    periodicidad: 1,
    estimacion: 3,
    lugar: 'Palermo. Osvaldo 940',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: [{
		  precio: 100,
		  descuento: 10,
		  descripcion: 'hiper descuento'
	  }],
    completada: false
  },
  {
    nombre: 'Fiesta para adolescentes',
	  descripcion: '¿ Queres divertirte ? Veni el sabado',
    fechaInicio: '10/7/2017',
    horaInicio: '00:00',
    fechaFin: '10/7/2017',
    horaFin: '06:00',
    categorias: ['fiesta', 'tragos', 'gratis'],
    prioridad: 'alta',
    participantes: [],
    recordatorio: '',
    periodicidad: 1,
    estimacion: 3,
    lugar: 'Palermo. Osvaldo 940',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: [{
		  precio: 200,
		  descuento: 10,
		  descripcion: 'hiper descuento'
	  }],
    completada: false
  },
  {
    nombre: 'Fiestas infantiles',
	  descripcion: 'Festejale a tu hijo ya!',
    fechaInicio: '14/7/2017',
    horaInicio: '10:00',
    fechaFin: '30/9/2017',
    horaFin: '20:00',
    categorias: ['fiesta', 'niños', 'infantiles'],
    prioridad: 'alta',
    participantes: [],
    recordatorio: '',
    periodicidad: 1,
    estimacion: 3,
    lugar: 'Lanus. Sarmiento 450',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: [{
		  precio: 1000,
		  descuento: 5,
		  descripcion: 'descuento apreciado'
	  }],
    completada: false
  }
]


const activitiesJuanma = [
  {
    nombre: 'Regar las plantas',
	  descripcion: '   ',
    fechaInicio: '10/7/1900',
    horaInicio: '12:00',
    fechaFin: '10/7/1900',
    horaFin: '13:00',
    categorias: ['4_Hogar'],
    prioridad: 'alta',
    participantes: [],
    recordatorio: 'minguno',
    periodicidad: 0,
    estimacion: 3,
    lugar: 'lujan',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: [],
    completada: false
  },
  {
    nombre: 'Informe',
	  descripcion: '   ',
    fechaInicio: '10/7/1900',
    horaInicio: '12:00',
    fechaFin: '10/7/1900',
    horaFin: '13:00',
    categorias: ['6_Trabajo'],
    prioridad: 'alta',
    participantes: [],
    recordatorio: 'minguno',
    periodicidad: 0,
    estimacion: 3,
    lugar: 'lujan',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: [],
    completada: false
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
    beneficios: [],
    completada: false
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
    beneficios: [],
    completada: false
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
    beneficios: [],
    completada: false
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
    beneficios: [],
    completada: false
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
    beneficios: [],
    completada: false
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
    beneficios: [],
    completada: false
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
    beneficios: [],
    completada: false
  }
]
