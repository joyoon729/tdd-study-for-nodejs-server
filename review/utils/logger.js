const chalk = require('chalk');

const dateFormatter = require('./date-formatter');

const timeLog = (msg) => {
    const time = new Date().format('yyyy-MM-dd HH:mm:ss');
    console.log(
        chalk.bold.blue(`[${time}]`) + ' ' + chalk.bold.white(msg)
    )
}

module.exports = { timeLog };