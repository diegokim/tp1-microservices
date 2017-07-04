const name = 'diego';
const username = 'diego123';
const username2 = 'lucas123';
const email = 'diego@gmail.com';
const password = 'kim';
const password2 = 'ludueno';
const nacimiento = '10/10/1990'

module.exports.user = {
  username,
  password
};
module.exports.user2 = {
  username: username2,
  password: password2
};
module.exports.newUser = {
  name,
  username,
  email,
  password,
  nacimiento
};
module.exports.newUser2 = {
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
  tipo: 'publica',
  beneficios: [{
    precio: 10,
    descuento: 10,
    descripcion: ''
  }],
  completada: false
}

module.exports.activity = activity;

module.exports.objective = {
  nombre: 'Dejar de fumar',
  descripcion: 'El pucho me esta haciendo mal',
  categorias: ['Salud']
}

const updatedActivity = activity;
updatedActivity.descripcion = 'Partidasoo';
module.exports.updatedActivity = updatedActivity;
