const ObjectiveRepository = require('../repositories/objectivesRepository');
const ActivityService = require('./activitiesService')

module.exports.create = ({ objective, username, actividades }) => {
  const newObjective = new ObjectiveRepository(Object.assign({}, objective, { username }, { actividades }));

  return ObjectiveRepository.create(newObjective)
    .catch((err) => {
      console.log(err)
      Promise.reject({ status: 409, message: err })
    });
};

module.exports.list = ({ username }) => Promise.resolve()
	.then(() => ObjectiveRepository.getObjectivesByUsername(username))
;

module.exports.addActivity = ({username, objectiveId}, activityId) => Promise.resolve()
  .then(() => ActivityService.activityExists(activityId))
  .then(() => ObjectiveRepository.getObjectiveBy({username, objectiveId}))
  .then((objective) => {
    if (objective) {
      const newActividades = objective[0].actividades;
      newActividades.push(activityId);
      return objective[0].update({actividades: newActividades})
    } else {
      return Promise.reject({ status: 403, message: 'Unauthorize' });
    }
  })
  .catch((err) => {
    console.log(err)
    Promise.reject({ status: 409, message: err })
  });
