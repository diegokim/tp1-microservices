module.exports.isValidActivity = (user) => (
  user.nombre &&
  user.descripcion &&
  user.fechaInicio &&
  user.horaInicio &&
  user.fechaFin &&
  user.horaFin &&
  user.categorias &&
  user.prioridad &&
  user.participantes &&
  user.recordatorio &&
  user.periodicidad &&
  user.estimacion &&
  user.objetivo &&
  user.tipo &&
  user.beneficios &&
  user.beneficios.precio &&
  user.beneficios.descuento &&
  user.beneficios.descripcion
);
