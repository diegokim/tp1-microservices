const ActivityRepository = require('../repositories/activitiesRepository');
const ObjectiveRepository = require('../repositories/objectivesRepository');
const ObjectiveService = require('./objectivesService')

module.exports.create = ({ activity, username, objective }) => {

  const newActivity = new ActivityRepository(Object.assign({}, activity, {aceptados: []}, { username }));

  return ActivityRepository.create(newActivity)
  .then((act) => {
    if (objective) {
      const objectiveId = objective._id;
      return ObjectiveRepository.getObjectiveById(objectiveId)
        .then((obj) => obj ?
            ObjectiveRepository.addActivityToObjective({ username, objectiveId: objectiveId, activityId: act._id }) :
            ObjectiveService.create({objective, username, actividades: [act._id.toString()]}))
        .then(() => act)
    } else {
      return act;
    }
  })
  .catch((err) => Promise.reject({ status: 409, message: err }));
};

module.exports.register = ({ activityId, username }) => Promise.resolve()
  .then(() => ActivityRepository.addUser(activityId, username))
  .catch((err) => Promise.reject({ status: 409, message: err }))
;

module.exports.list = ({ username }) => Promise.resolve()
	.then(() => ActivityRepository.getActivitiesByUsername(username))
;

module.exports.activityExists = (activityId) => ActivityRepository.findById(activityId)
  .then((activity) => {
    if (activity) {
      return Promise.resolve();
    }
    return Promise.reject('Activity not exists');
  })

module.exports.update = (id, username, activity) => ActivityRepository.updateActivity(id, username, activity)

module.exports.delete = ({ activityId, username }) => Promise.resolve()
  .then(() => ActivityRepository.getActivityById(activityId))
  .then((activ) => {
    if (activ) {
      if (activ.username === username) {
        return ActivityRepository.delete(activityId);
      } else {
        return ActivityRepository.removeFromActivity(activityId, username)
      }
    }
    return Promise.reject({ status: 403, message: 'Unauthorize' });
  })
  .then(() => ObjectiveRepository.deleteActivityFromAll(activityId))
;

module.exports.search = ({ params }) => Promise.resolve()
	.then(() => ActivityRepository.search(params))
;
