const ActivityRepository = require('../repositories/activitiesRepository');

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

module.exports.delete = ({ activityId, username }) => Promise.resolve()
  .then(() => ActivityRepository.getActivityByIdAndUsername(activityId, username))
  .then((activ) => {
    if (activ) {
      return ActivityRepository.delete(activityId);
    }
    return Promise.reject({ status: 403, message: 'Unauthorize' });
  })
;
