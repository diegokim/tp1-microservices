module.exports.isValidActivity = (activity) => (
  activity.nombre &&
  activity.descripcion &&
  activity.fechaInicio &&
  activity.horaInicio &&
  activity.fechaFin &&
  activity.horaFin &&
  activity.categorias &&
  activity.prioridad &&
  activity.participantes &&
  activity.recordatorio &&
  activity.periodicidad &&
  activity.estimacion &&
  activity.foto &&
  activity.tipo &&
  activity.beneficios
);

module.exports.isValidSearch = (params) => (
  params.tipo ||
  params.texto ||
  params.categorias ||
  params.fechaInicio ||
  params.fechaFin
);
