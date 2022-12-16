const sequelize = require('sequelize');
const config = require('../config/database');
const Alumno = require('../app/models/alumno');
const Profesor = require('../app/models/profesor');

let connection = {};

if (process.env.NODE_ENV === 'development') {
  connection = new sequelize(config['development']);
} else {
  connection = new sequelize(config['production']);
}

Alumno.init(connection);
Profesor.init(connection);

module.exports = connection;