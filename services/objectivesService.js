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

module.exports.addActivityToObjective = ({username, objectiveId}, activityId) => Promise.resolve()
  .then(() => ActivityService.activityExists(activityId)) //Es necesario que la actividad sea del user con username??
  .then(() => ObjectiveRepository.addActivityToObjective({username, objectiveId}, activityId))
  .catch((err) => {
    console.log(err)
    Promise.reject({ status: 409, message: err })
  });

module.exports.delete = (objectiveId, username) => Promise.resolve()
  .then(() => ObjectiveRepository.getObjectiveById(objectiveId))
  .then((objective) => {
    if (objective) {
      if (objective.username === username) {
        return ObjectiveRepository.delete(objectiveId);
      } else {
        return Promise.reject({ status: 403, message: 'Unauthorize' });
      }
    } else {
      return Promise.reject({ status: 403, message: 'Unauthorize' });
    }
  })

module.exports.removeActivityFromObjective = ({username, objectiveId, activityId}) => Promise.resolve()
  .then(() => ActivityService.activityExists(activityId))
  .then(() => ObjectiveRepository.getObjectiveById(objectiveId))
  .then((objective) => {
    if (objective) {
      if (objective.username === username) {
        return ObjectiveRepository.removeActivityFromObjective(objectiveId, activityId);
      } else {
        return Promise.reject({ status: 403, message: 'Unauthorize' });
      }
    } else {
      return Promise.reject({ status: 403, message: 'Unauthorize' });
    }
  })
  .catch(() => Promise.reject({ status: 403, message: 'Unauthorize' }))
