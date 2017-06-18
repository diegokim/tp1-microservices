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

module.exports.search = function (params) {
  const query = { $and: [{ $or: [] }, { tipo: 'publica' }] }
  if (params.tipo === 'random') {
    return Activity.find().limit(5)
  } else {
    if (params.fechaDesde && params.fechaHasta) {
      query.$and[0].$or.push({ $and: [{ fechaInicio: { $gt: params.fechaDesde } }, { fechaFin: { $lt: params.fechaHasta } }] })
    } else if (params.fechaDesde) {
      query.$and[0].$or.push({ fechaInicio: { $gt: params.fechaDesde } }) // ESTA COMPARACION DE FECHAS NUNCA VA A FUNCIONAR JAJA
    } else if (params.fechaHasta) {
      query.$and[0].$or.push({ fechaFin: { $lt: params.fechaHasta } })
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
