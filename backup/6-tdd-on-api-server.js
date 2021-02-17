const { request } = require('express');
const express = require('express');
const app = express();
const morgan = require('morgan');  // logger middle ware
const bodyParser = require('body-parser');  // body 내용 parsing 위한 middle ware (params 는 express 에서 지원하는데, body 는 아님)

let users = [
    {id: 1, name: 'alice'},
    {id: 2, name: 'bek'},
    {id: 3, name: 'chris'},
];

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users', (req, res) => {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);  // query string의 value를 이렇게 가져올 수 있다.
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    res.json(users.slice(0, limit));
});

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) return res.status(400).end();  // id 숫자가 아닐 경우 400

    const user = users.filter((user) => {
        if (user.id === id) {
            return user;
        }
    })[0];

    if (!user) return res.status(404).end();  // 유저 id 없을 경우 404

    res.json(user);
});

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) return res.status(400).end();

    users = users.filter(user => user.id !== id);

    res.status(204).end();
});

app.post('/users', (req, res) => {
    const name = req.body.name;
    const id = Date.now();
    const user = { id, name };

    if (!name) return res.status(400).end();  // name 누락 시 400
    const isConflict = (users.filter(user => user.name === name).length)
    if (isConflict) return res.status(409).end();

    users.push(user);
    res.status(201).json(user);
})

app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();  // id 가 정수가 아닐 경우 400

    const name = req.body.name;
    if (!name) return res.status(400).end();

    const user = users.filter(user => user.id === id)[0];
    if (!user) return res.status(404).end();
    const isConflict = users.filter(user => user.name === name).length;
    if (isConflict) return res.status(409).end();

    user.name = name;

    res.json(user);
})

// app.listen(3000, () => {
//     console.log('Example app listening on port 3000');
// })

module.exports = app;