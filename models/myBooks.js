const Sequelize = require("sequelize");
const connection = require("../database/database");

const Mybooks = connection.define("myBooks",{
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




Mybooks.sync({force:false});


module.exports = Mybooks;

