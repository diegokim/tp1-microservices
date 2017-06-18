const ObjectiveRepository = require('../repositories/objectivesRepository');

module.exports.create = ({ objective, username }) => {
  const newObjective = new ObjectiveRepository(Object.assign({}, objective, { username }));

  return ObjectiveRepository.create(newObjective)
  	.catch((err) => Promise.reject({ status: 409, message: err }));
};

module.exports.list = ({ username }) => Promise.resolve()
	.then(() => ObjectiveRepository.getObjectivesByUsername(username))
;
