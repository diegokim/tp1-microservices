module.exports.isValidObjective = (objective) => (
  objective.nombre &&
  objective.descripcion &&
  objective.categorias &&
  objective.actividades
);
