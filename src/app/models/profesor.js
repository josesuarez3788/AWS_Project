const { Model, DataTypes } = require('sequelize');

class Profesor extends Model {
  static init(sequelize) {
    super.init(
      {
        nombres: {
          type: DataTypes.STRING,
        },
        apellidos: {
          type: DataTypes.STRING,
        },
        numeroEmpleado: {
          type: DataTypes.INTEGER,
        },
        horasClase: {
          type: DataTypes.INTEGER,
        },
      },
      { sequelize, tableName: 'Profesores' }
    );
  }
}

module.exports = Profesor;