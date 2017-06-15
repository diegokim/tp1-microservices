const ActivityRepository = require('../repositories/activityRepository');

module.exports.create = ({ activity, username }) => {
  const newActivity = new ActivityRepository(activity, username);

  return ActivityRepository.create(newActivity)
  	.catch((err) => Promise.reject({ status: 409, message: err }));
};

module.exports.list = ({ username }) => Promise.resolve()
	.then(() => UserRepository.getByUsername(username))
;

