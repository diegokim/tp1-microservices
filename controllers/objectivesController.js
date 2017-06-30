const _ = require('lodash');
const objectivesService = require('../services/objectivesService');
const aux = require('../utils/auxiliar.functions.js')

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
  	.catch((err) => aux.onError('Objectives Create', res, err));
};

module.exports.addActivityToObjective = (req, res) => {
  const username = req.user.username
  const objectiveId = req.params.objectiveId
  const activityId = req.body.activityId;
  return objectivesService.addActivityToObjective({ username, objectiveId, activityId})
		.then((obj) => res.status(204).send(obj))
		.catch((err) => aux.onError('Objectives add activity to objective', res, err));
};

module.exports.list = (req, res) => {
  const username = req.user.username
  return objectivesService.list({ username })
		.then((objective) => res.status(200).json(objective))
		.catch((err) => aux.onError('Objectives list', res, err));
};

module.exports.delete = (req, res) => {
  const username = req.user.username;
  const objectiveId = req.params.objectiveId
  return objectivesService.delete(objectiveId, username)
  .then(() => res.sendStatus(200))
  .catch((err) => aux.onError('Objectives delete', res, err));
}


module.exports.removeActivityFromObjective = (req, res) => {
  const username = req.user.username;
  const objectiveId = req.params.objectiveId;
  const activityId = req.params.activityId;
  return objectivesService.removeActivityFromObjective({username, objectiveId, activityId})
  .then(() => res.sendStatus(200))
  .catch((err) => aux.onError('Objectives remove activity from objective', res, err));
}
