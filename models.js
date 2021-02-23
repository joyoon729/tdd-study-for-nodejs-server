/**
 * ORM (Object Relational Mapping)
 * NodeJS 의 ORM 은 Sequelize 이다.
 */

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: false
});

const User = sequelize.define('User', {
    name: {
        type: Sequelize.STRING,  // varchar 255
        unique: true
    }
});

module.exports = {Sequelize, sequelize, User};