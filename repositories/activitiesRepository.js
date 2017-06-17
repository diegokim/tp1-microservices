const mongoose = require('mongoose')

//  Activity Schema
const ActivitySchema = mongoose.Schema({
  nombre: {
    type: String
  },
  descripcion: {
    type: String
  },
  fechaInicio: {
    type: String
  },
  horaInicio: {
    type: String
  },
  fechaFin: {
    type: String
  },
  horaFin: {
    type: String
  },
  categorias: {
    type: Array
  },
  prioridad: {
    type: String
  },
  participantes: {
    type: Array
  },
  recordatorio: {
    type: String
  },
  periodicidad: {
    type: Number
  },
  estimacion: {
    type: Number
  },
  objetivo: {
    type: String
  },
  tipo: {
    type: String
  },
  beneficios: {
    type: Array
  },
  username: {
    type: String
  }
})

// eslint-disable-next-line
const Activity = module.exports = mongoose.model('Activity', ActivitySchema)

module.exports.getActivityById = function (id) {
  return Activity.findById(id);
}

module.exports.getActivitiesByUsername = function (username) {
  const query = { username }
  return Activity.find(query);
}

module.exports.create = function (activity) {
  return activity.save();
}

module.exports.update = function (id, username, updatedActivity) {
  return Activity.findById(id) // Tendria que ver que onda el tema de seguridad
  .then((activity) => activity.update(updatedActivity));
}
