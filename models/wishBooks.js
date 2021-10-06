const Sequelize = require("sequelize");
const connection = require("../database/database");

const wishBooks = connection.define("wishBooks",{
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    autor:{
         type:Sequelize.STRING,
        allowNull:false,
    },
    resume:{
        type:Sequelize.TEXT,
        allowNull:false,
    }

});




wishBooks.sync({force:false});


module.exports = wishBooks;

