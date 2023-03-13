const {DataTypes,Sequelize} = require('sequelize');
const bcrypt = require("bcrypt");
const {sequelize} = require('../config/database/db');

 const User = sequelize.define('User',{
     
     id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },

     fname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lname: {
        type: DataTypes.STRING,
        allowNull: false
    },

    uname: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // A column for the author name 
    role: {
        type: DataTypes.ENUM('Admin','Author','Reader'),
        defaultValue:'Reader'
        
    }
},{
    hooks : {
        beforeCreate : (user , options) => {
            {
                user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 10) : "";
                console.log(user.password);
                return false;
            }
        }
    }
 });
module.exports = {User}; 