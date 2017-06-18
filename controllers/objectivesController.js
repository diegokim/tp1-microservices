const _ = require('lodash');
const objectivesService = require('../services/objectivesService');

module.exports.create = (req, res) => {
  const objective = _.pick(req.body, [
    'nombre',
    'descripcion',
    'categorias',
    'actividades'
  ])
  const username = req.user.username

  return objectivesService.create({ objective, username })
	  .then((createdObjective) => res.status(201).json(createdObjective))
  	.catch((err) => res.status(err.status).json(err.message));
};

// module.exports.register = (req, res) => {
//   const username = req.user.username
//   const objectiveId = req.params.objectiveId
//   return activitiesService.register({ username, objectiveId })
// 		.then(() => res.status(204).send())
// 		.catch((err) => res.status(err.status).json(err.message));
// };

module.exports.list = (req, res) => {
  const username = req.user.username
  return objectivesService.list({ username })
		.then((objective) => res.status(200).json(objective))
		.catch((err) => res.status(err.status).json(err.message));
};
