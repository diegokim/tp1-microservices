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
  return Objective.findOne(query);
}

module.exports.getObjectivesByUsername = function (username) {
  const query = { username }
  return Objective.find(query);
}

module.exports.create = function (objective) {
  return objective.save();
}

module.exports.addActivityToObjective = function ({username, objectiveId, activityId}) {
  return this.getObjectiveBy({username, _id: objectiveId})
  .then((objective) => {
    if (objective) {
      const newActividades = objective.actividades;
      newActividades.push(activityId);
      return objective.update({actividades: newActividades})
    } else {
      return Promise.reject('Objective not found in addActivityToObjective'); //Esta bien devolver esto aca?
    }
  })
}

module.exports.delete = (id) => {
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

module.exports.deleteActivityFromAll = function (activityId) {
  const regex = new RegExp('.*' + activityId + '.*');
  const query = { actividades: { $regex: regex } }

  return Objective.find(query)
    .then((objetives) => {
      const promises = [];
      objetives.forEach((objective) => {
        const activities = objective.actividades;
        const activityIndex = activities.indexOf(activityId);
        if (activityIndex > -1) {
          activities.splice(activityIndex, 1);
        }
        promises.push(objective.update({ actividades: activities }))
      });
      return Promise.all(promises);
    })
    .catch(() => Promise.reject('deleteActivityFromAll: findError'))
}
