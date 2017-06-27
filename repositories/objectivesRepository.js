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

module.exports.getObjectiveBy = function (query) {
  return Objective.find(query);
}

module.exports.getObjectivesByUsername = function (username) {
  const query = { username }
  return Objective.find(query);
}

module.exports.create = function (objective) {
  return objective.save();
}

module.exports.addActivityToObjective = function ({username, objectiveId}, activityId) {
  return this.getObjectiveBy({username, objectiveId})
  .then((objective) => {
    if (objective) {
      const newActividades = objective[0].actividades;
      newActividades.push(activityId);
      return objective[0].update({actividades: newActividades})
    } else {
      console.log('Objective not found in addActivityToObjective')
      return Promise.reject('Unauthorize'); //Esta bien devolver esto aca?
    }
  })
}

module.exports.delete = (id) => {
  console.log(id)
  const query = { _id: id };
  return Objective.remove(query);
}

module.exports.removeActivityFromObjective = function (objectiveId, activityId) {
  return Objective.findById(objectiveId)
   .then((objective) => {
     if (objective) {
       const activities = objective.actividades;
       const activityIndex = activities.indexOf(activityId);
       if (activityIndex > -1) {
         activities.splice(activityIndex, 1);
       }
       return objective.update({actividades: activities})
     } else {
       return Promise.reject('removeActivityFromObjective: User not found');
     }
   })
   .catch(() => Promise.reject('removeActivityFromObjective: findByIdError'))
}
