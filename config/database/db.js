const {Sequelize, DataTypes,Model} = require("sequelize");

const sequelize = new Sequelize(
    'local_auth',
    'root',
    '',
    {
        host:'localhost',
        dialect:'mysql'
    }
    /* process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PWD,
     {
       host: process.env.DB_HOST,
       dialect: 'mysql'
     } */
   );
 
 sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
 const db = {};
 /* db.sequelize = sequelize;
 db.Sequelize = Sequelize;
 db.DataTypes  = DataTypes;
 // import models here 
 db.book = require('../../models/BookModel')(sequelize, Sequelize, DataTypes);  */
 
 module.exports = {sequelize}