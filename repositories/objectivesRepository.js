const mongoose = require('mongoose')

//  Objective Schema
const ObjectiveSchema = mongoose.Schema({
  nombre: {
    type: String
  },
  username: {
    type: String
  },
  descripcion: {
    type: String
  },
  categorias: {
    type: Array
  },
  actividades: {
    type: Array
  }
})

// eslint-disable-next-line
const Objective = module.exports = mongoose.model('Objective', ObjectiveSchema)

module.exports.getObjectiveById = function (id) {
  return Objective.findById(id);
}

module.exports.getObjectivesByUsername = function (username) {
  const query = { username }
  return Objective.find(query);
}

module.exports.create = function (objective) {
  return objective.save();
}
