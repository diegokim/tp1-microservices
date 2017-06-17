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


module.exports.search = function (params) {
  const query = { $or: [] }
  if (params.tipo === 'random') {
    return Activity.find().limit(5).skip(_rand() * Activity.count())
  } else {
    if (params.fechaDesde && params.fechaHasta) {
      query.$or.push({ fechaInicio: { $gt: params.fechaDesde } })
    } else if (params.fechaDesde) {
      query.$or.push({ fechaInicio: { $gt: params.fechaDesde } })
    } else if (params.fechaHasta) {
      query.$or.push({ fechaFin: { $lt: params.fechaHasta } })
    }
    if (params.texto) {
      const regex = new RegExp('*' + texto + '*');
      query.$or.push(
        { nombre: regex },
        { descripcion: regex },
        { categorias: { $elemMatch: regex } })
    }
    if (params.categorias) {
      for (const categoria of params.categorias) {
        const regex = new RegExp('*' + categoria + '*');
        query.$or.push(
          { nombre: regex },
          { descripcion: regex },
          { categorias: { $elemMatch: regex } })
      }
    }
  }
  return Activity.find(query);
}
