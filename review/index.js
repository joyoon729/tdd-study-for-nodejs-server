const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const live = require('./APIs/live/index');
const users = require('./APIs/users/index');
const syncDb = require('./bin/sync-db');

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', live);
app.use('/live', live);
app.use('/users', users);


module.exports = app;