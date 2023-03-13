const {DataTypes,Sequelize} = require('sequelize')
const {sequelize} = require('./../config/database/db');

 const Book = sequelize.define('Book',{
     // Our primaryKey, book id, our unique identifier
     id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },

    // A column for the title of our book
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // A column for the author name 
    autherId: {
        type: DataTypes.STRING
        // remember allowNull defaults to true
    }
});
module.exports = {Book}; 