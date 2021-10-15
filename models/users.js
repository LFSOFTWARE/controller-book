const Sequelize = require('sequelize');
const connection = require("../database/database");

const Users = connection.define("Users",{
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    email:{
         type:Sequelize.STRING,
        allowNull:false,
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    status:{
         type:Sequelize.STRING,
        allowNull:false,
    }

});




Users.sync({force:false});


module.exports = Users;
