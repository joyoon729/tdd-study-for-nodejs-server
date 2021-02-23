const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const user = require('./api/user/index.js');

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}

app.use(bodyParser.json());  // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded

app.use('/users', user);  // url 의 '/users' 로 들어오는 부분은 user 모듈이 담당한다.

module.exports = app;  // test 코드에서 사용할 수 있도록 export