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

module.exports.getActivityByIdAndUsername = function (id, username) {
  const query = { $and: [{ _id: id }, { username }] };
  return Activity.findOne(query);
}

module.exports.delete = function (id) {
  const query = { _id: id };
  return Activity.remove(query);
}

module.exports.getActivitiesByUsername = function (username) {
  const query = { $or: [{ username }, { participantes: { $regex: username } }] }
  return Activity.find(query);
}

module.exports.addUser = function (activityId, username) {
  const query = { _id: activityId }
  return Activity.findById(query)
    .then((activity) => {
      const newParticipants = activity.participantes;
      newParticipants.push(username);
      return activity.update({ participantes: newParticipants });
    })
}

module.exports.create = function (activity) {
  return activity.save();
}
