const ActivityRepository = require('../repositories/activitiesRepository');
const ObjetiveRepository = require('../repositories/objectivesRepository');

module.exports.create = ({ activity, username }) => {
  const newActivity = new ActivityRepository(Object.assign({}, activity, { username }));

  return ActivityRepository.create(newActivity)
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
  .then(() => ObjetiveRepository.deleteActivityFromAll(activityId))
;

module.exports.search = ({ params }) => Promise.resolve()
	.then(() => ActivityRepository.search(params))
;
