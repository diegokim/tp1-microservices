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
  foto: {
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
  },
  completada: {
    type: Boolean
  }
})

// eslint-disable-next-line
const Activity = module.exports = mongoose.model('Activity', ActivitySchema)

module.exports.getActivityById = function (id) {
  return Activity.findById(id);
}

module.exports.removeFromActivity = function (id, username) {
  return Activity.findById(id)
    .then((activity) => {
      if (activity) {
        const newParticipants = activity.participantes;
        const userIndex = newParticipants.indexOf(username);
        if (userIndex > -1) {
          newParticipants.splice(userIndex, 1);
        }
        return activity.update({ participantes: newParticipants });
      }
    })
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

module.exports.updateActivity = function (id, username, updatedActivity) {
  return Activity.findById(id) // Tendria que ver que onda el tema de seguridad
  .then((activity) => activity.update(updatedActivity));
}

module.exports.search = function (params) {
  const query = { $and: [{ $or: [] }, { tipo: 'publica' }] }
  if (params.tipo === 'random') {
    return Activity.find().limit(5)
  } else {
    if (params.fechaInicio && params.fechaFin) {
      query.$and[0].$or.push({ $and: [{ fechaInicio: { $gt: params.fechaInicio } }, { fechaFin: { $lt: params.fechaFin } }] })
    } else if (params.fechaInicio) {
      query.$and[0].$or.push({ fechaInicio: { $gt: params.fechaInicio } }) // ESTA COMPARACION DE FECHAS NUNCA VA A FUNCIONAR JAJA
    } else if (params.fechaFin) {
      query.$and[0].$or.push({ fechaFin: { $lt: params.fechaFin } })
    }
    if (params.texto) {
      const regex = new RegExp('.*' + params.texto + '.*');
      query.$and[0].$or.push(
        { nombre: regex },
        { descripcion: regex },
        { categorias: { $regex: regex } })
    }
    if (params.categorias) {
      for (const categoria of params.categorias) {
        const regex = new RegExp('.*' + categoria + '.*');
        query.$and[0].$or.push(
          { nombre: regex },
          { descripcion: regex },
          { categorias: { $regex: regex } })
      }
    }
  }
  return Activity.find(query);
}
