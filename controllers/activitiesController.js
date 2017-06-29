const _ = require('lodash');
const activitiesService = require('../services/activitiesService');
const aux = require('../utils/auxiliar.functions.js')

module.exports.create = (req, res) => {
  const activity = _.pick(req.body, [
    'nombre',
    'descripcion',
    'fechaInicio',
    'horaInicio',
    'fechaFin',
    'horaFin',
    'categorias',
    'prioridad',
    'participantes',
    'recordatorio',
    'periodicidad',
    'estimacion',
    'foto',
    'tipo',
    'beneficios',
    'completada'
  ])

  const username = req.user.username

  return activitiesService.create({ activity, username })
	  .then((createdActivity) => res.status(201).json(createdActivity))
  	.catch((err) => aux.onError('Activities create', res, err));
};

module.exports.register = (req, res) => {
  const username = req.user.username
  const activityId = req.params.activityId
  return activitiesService.register({ username, activityId })
		.then(() => res.status(204).send())
		.catch((err) => aux.onError('Activities register', res, err));
};

module.exports.list = (req, res) => {
  const username = req.user.username;
  return activitiesService.list({ username })
		.then((activity) => res.status(200).json(activity))
		.catch((err) => aux.onError('Activities list', res, err));
};

module.exports.update = (req, res) => {
  const username = req.user.username;
  const activity = _.pick(req.body, [
    'nombre',
    'descripcion',
    'fechaInicio',
    'horaInicio',
    'fechaFin',
    'horaFin',
    'categorias',
    'prioridad',
    'participantes',
    'recordatorio',
    'periodicidad',
    'estimacion',
    'objetivo',
    'tipo',
    'beneficios',
    'completada'
  ])
  const id = req.params.activityId;
  return activitiesService.update(id, username, activity)
		.then((activity) => res.status(204).json(activity))
		.catch((err) => aux.onError('Activities update', res, err));
};

module.exports.delete = (req, res) => {
  const username = req.user.username
  const activityId = req.params.activityId
  return activitiesService.delete({ username, activityId })
		.then(() => res.status(204).send())
		.catch((err) => aux.onError('Activities delete', res, err));
};

module.exports.search = (req, res) => {
  const params = _.pick(req.body, [
    'tipo',
    'texto',
    'fechaInicio',
    'fechaFin',
    'categorias'
  ])
  return activitiesService.search({ params })
		.then((activities) => res.status(200).json(activities))
		.catch((err) => aux.onError('Activities search', res, err));
};
