module.exports.isValidActivity = (activity) => (
  (activity.nombre !== null) &&
  (activity.descripcion !== null) &&
  (activity.fechaInicio !== null) &&
  (activity.horaInicio !== null) &&
  (activity.fechaFin !== null) &&
  (activity.horaFin !== null) &&
  (activity.categorias !== null) &&
  (activity.prioridad !== null) &&
  (activity.participantes !== null) &&
  (activity.recordatorio !== null) &&
  (activity.periodicidad !== null) &&
  (activity.estimacion !== null) &&
  (activity.foto !== null) &&
  (activity.tipo !== null) &&
  (activity.beneficios !== null) &&
  (activity.completada !== null)
);

module.exports.isValidSearch = (params) => (
  params.tipo ||
  params.texto ||
  params.categorias ||
  params.fechaInicio ||
  params.fechaFin
);
