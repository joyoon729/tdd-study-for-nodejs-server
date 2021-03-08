const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: false
});

const User = sequelize.define('User', 
{
    name: {
        type: Sequelize.STRING,
        unique: true
    },
    age: {
        type: Sequelize.INTEGER
    },
},
{
    tableName: "User"
})


module.exports = {Sequelize, sequelize, User};