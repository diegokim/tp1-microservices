const _ = require('lodash');
const activitiesService = require('../services/activitiesService');

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
    'objetivo',
    'tipo',
    'beneficios'
  ])

  const username = req.user.username

  return activitiesService.create({ activity, username })
	  .then((createdActivity) => res.status(201).json(createdActivity))
  	.catch((err) => res.status(err.status).json(err.message));
};

module.exports.list = (req, res) => {
  const username = req.user.username
  return activitiesService.list({ username })
		.then((activity) => res.status(200).json(activity))
		.catch((err) => res.status(err.status).json(err.message));
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
    'beneficios'
  ])
  const id = req.params.activityId;
  return activitiesService.update(id, username, activity)
		.then((activity) => res.status(204).json(activity))
		.catch((err) => res.status(err.status).json(err.message));
};
