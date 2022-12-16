require('dotenv').config();

module.exports = {
  development: {
    dialect: 'postgres',
    database: 'escuelaAWS',
    username: 'postgres',
    password: 'postgres',
    host: 'escuela-aws.c3lh3hybon13.us-east-1.rds.amazonaws.com',
    port: 5432
  },
  production: {
    dialect: "postgres",
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    database: process.env.RDS_DB_NAME
  }
};