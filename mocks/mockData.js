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
  // ACTIVIDADES FUTBOL
  {
    nombre: 'Partido de Futbol',
	  descripcion: 'partido de futbol con amigos',
    fechaInicio: '10/7/2017',
    horaInicio: '12:00',
    fechaFin: '10/7/2017',
    horaFin: '13:00',
    categorias: ['futbol', 'pelota'],
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
    recordatorio: 'ninguno',
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
    recordatorio: 'ninguno',
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
  {
    nombre: 'Clases de futbol 11',
	  descripcion: 'Clases para divertirse con amigos',
    fechaInicio: '14/8/2017',
    horaInicio: '10:00',
    fechaFin: '20/12/2017',
    horaFin: '12:00',
    categorias: ['futbol', 'clases', 'partido', 'gol'],
    prioridad: 'alta',
    participantes: [],
    recordatorio: 'ninguno',
    periodicidad: 1,
    estimacion: 3,
    lugar: 'Quilmes',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: [{
		  precio: 600,
		  descuento: 10,
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
    recordatorio: 'ninguno',
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
    recordatorio: 'ninguno',
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
    recordatorio: 'ninguno',
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
    recordatorio: 'ninguno',
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
    recordatorio: 'ninguno',
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
    recordatorio: 'ninguno',
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
  },
  {
    nombre: 'Google Event',
	  descripcion: 'Evento de google en puerto madero',
    fechaInicio: '20/8/2017',
    horaInicio: '10:00',
    fechaFin: '20/8/2017',
    horaFin: '16:00',
    categorias: ['evento', 'google', 'pmadero'],
    prioridad: 'alta',
    participantes: [],
    recordatorio: 'ninguno',
    periodicidad: 1,
    estimacion: 3,
    lugar: 'Juana manso 332',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: [{
		  precio: 1000,
		  descuento: 20,
		  descripcion: 'descuento apreciado'
	  }],
    completada: false
  },

    // ACTIVIDADES COMPRA
  {
    nombre: 'Zapatillas Nike',
	  descripcion: 'Venta de zapatillas en caballito',
    fechaInicio: '12/10/2017',
    horaInicio: '10:00',
    fechaFin: '12/12/2017',
    horaFin: '20:00',
    categorias: ['venta', 'zapatillas'],
    prioridad: 'alta',
    participantes: [],
    recordatorio: 'ninguno',
    periodicidad: 1,
    estimacion: 3,
    lugar: 'Caballito. AV la Plata 940',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: [{
		  precio: 400,
		  descuento: 5,
		  descripcion: 'hiper descuento'
	  }],
    completada: false
  },
  {
    nombre: 'Venta Perfumes',
	  descripcion: 'Perfumes importados',
    fechaInicio: '05/7/2017',
    horaInicio: '04:00',
    fechaFin: '16/7/2017',
    horaFin: '17:00',
    categorias: ['perfumes', 'compra', 'venta'],
    prioridad: 'alta',
    participantes: [],
    recordatorio: 'ninguno',
    periodicidad: 1,
    estimacion: 3,
    lugar: 'Conurbano',
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
    nombre: 'Compra de indumentaria',
	  descripcion: 'Compra de indumentario ML',
    fechaInicio: '14/7/2017',
    horaInicio: '10:00',
    fechaFin: '30/9/2017',
    horaFin: '20:00',
    categorias: ['ml', 'mercado libre', 'indumentaria'],
    prioridad: 'alta',
    participantes: [],
    recordatorio: 'ninguno',
    periodicidad: 1,
    estimacion: 3,
    lugar: 'Palermo. Cabildo 220',
    foto: 'foto en base 64',
    tipo: 'publica',
    beneficios: [{
		  precio: 350,
		  descuento: 10,
		  descripcion: 'descuento'
	  }],
    completada: false
  }
]
