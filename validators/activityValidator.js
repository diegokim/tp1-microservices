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
  activity.objetivo &&
  activity.tipo &&
  activity.beneficios
);
