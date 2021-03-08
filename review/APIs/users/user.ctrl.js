// /users api logic

const models = require('../../models/models');

const index = (req, res) => {
    req.query.limit = req.query.limit || 10
    const limit = parseInt(req.query.limit, 10)

    if (Number.isNaN(limit)) return res.status(400).end()

    models.User
        .findAll({
            limit: limit
        })
        .then(users => { 
            res.send(users)
        });
}

const show = (req, res) => {
    const id = parseInt(req.params.id, 10);  // req.params 로 들어오는 값은 string

    if (Number.isNaN(id)) return res.status(400).end();

    models.User
        .findOne({where: {id}})
        .then(user => {
            if (!user) return res.status(404).end();
            res.send(user)
        });
}

const create = (req, res) => {
    // const id = Date.now();
    const name = req.body.name;
    const age = req.body.age;
    const user = {name, age}

    if (!name || !age) return res.status(400).end();

    models.User
        .create(user)
        .then(user => res.status(201).json(user))
        .catch(err => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                // 동일 이름 존재 시
                res.status(409).end();
            }
            // 나머지 500 에러
            res.status(500).end();
        })
}

const update = (req, res) => {
    const id = parseInt(req.params.id, 10)
    const name = req.body.name;
    const age = req.body.age;

    if (Number.isNaN(id)) return res.status(400).end();
    if (!name || !age) return res.status(400).end();

    models.User
        .findOne({where: {id}})
        .then(user => {
            if (!user) res.status(404).end();
            user.name = name;
            user.age = age;
            user.save()
                .then(_ => {
                    res.json(user);
                })
                .catch(err => {
                    if (err.name === 'SequelizeUniqueConstraintError') {
                        // 동일 이름 존재 시
                        res.status(409).end();
                    }
                    // 나머지 500 에러
                    res.status(500).end();
                })
        })
}

const destroy = (req, res) => {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) return res.status(400).end();

    models.User
        .findOne({where: {id}})
        .then(user => {
            if (!user) res.status(404).end();
            user.destroy()
                .then(_ => {
                    return res.status(204).end();
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).end();
                })
        })
}

module.exports = {
    index, show, create, update, destroy
}