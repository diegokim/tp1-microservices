const ActivityRepository = require('../repositories/activitiesRepository');

module.exports.create = ({ activity, username }) => {
  const newActivity = new ActivityRepository(Object.assign({}, activity, { username }));

  return ActivityRepository.create(newActivity)
  	.catch((err) => Promise.reject({ status: 409, message: err }));
};

module.exports.list = ({ username }) => Promise.resolve()
	.then(() => ActivityRepository.getActivitiesByUsername(username))
;

module.exports.update = (id, username, activity) => ActivityRepository.update(id, username, activity)
