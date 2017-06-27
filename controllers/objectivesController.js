const _ = require('lodash');
const objectivesService = require('../services/objectivesService');

module.exports.create = (req, res) => {
  const objective = _.pick(req.body, [
    'nombre',
    'descripcion',
    'categorias'
  ])
  const username = req.user.username;
  const actividades = [];

  return objectivesService.create({ objective, username, actividades })
	  .then((createdObjective) => res.status(201).json(createdObjective))
  	.catch((err) => res.status(err.status).json(err.message));
};

module.exports.addActivityToObjective = (req, res) => {
  const username = req.user.username
  const objectiveId = req.params.objectiveId
  const activityId = req.body.activityId;

  return objectivesService.addActivityToObjective({ username, objectiveId }, activityId)
		.then(() => res.status(204).send())
		.catch((err) => res.status(err.status).json(err.message));
};

module.exports.list = (req, res) => {
  const username = req.user.username
  return objectivesService.list({ username })
		.then((objective) => res.status(200).json(objective))
		.catch((err) => res.status(err.status).json(err.message));
};

module.exports.delete = (req, res) => {
  const username = req.user.username;
  const objectiveId = req.params.objectiveId
  return objectivesService.delete(objectiveId, username)
  .then(() => res.status(200))
  .catch((err) => {
    console.log(err)
    res.status(403).json('Unauthorize')
  })
}


module.exports.removeActivityFromObjective = (req, res) => {
  const username = req.user.username;
  const objectiveId = req.params.objectiveId;
  const activityId = req.params.activityId;
  return objectivesService.removeActivityFromObjective({username, objectiveId, activityId})
  .then(() => res.status(200))
  .catch((err) => {
    console.log(err)
    res.status(403).json(message);
  })
}
