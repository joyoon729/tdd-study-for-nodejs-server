const chalk = require('chalk');

const app = require('../index');
const syncDB = require('./sync-db');
const dateFormatter = require('../utils/date-formatter');
const logger = require('../utils/logger');
const portNumber = 3000;

syncDB().then(_ => {
    logger.timeLog('Database synced!');
    app.listen(portNumber, () => {
        logger.timeLog('Server is running...');
    })
})