// api 로직

const models = require('../../models');

const index = (req, res) => {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if (Number.isNaN(limit)) return res.status(400).end();

    models.User
        .findAll({
            limit: limit
        })
        .then(users => {
            res.json(users);
        })
}

const show = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    models.User
        .findOne({
            where: {
                id: id
            }
        })
        .then(user => {
            if (!user) return res.status(404).end();
            res.json(user);
        })
}

const destroy = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    models.User
        .destroy({
            where: {
                id: id
            }
        })
        .then(() => {
            res.status(204).end();
        })
}

const create = (req, res) => {
    const name = req.body.name;
    if (!name) return res.status(400).end();  // name 누락 시 400
    
    models.User
        .create({name})
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            // console.log(err)
            // if (err.name === 'SequelizeUniqueConstraintError') {
            if (err.parent.errno === 19) {
                return res.status(409).end();
            }
            res.status(500).end();
        })

    
    // const isConflict = (users.filter(user => user.name === name).length)
    // if (isConflict) return res.status(409).end();

    // users.push(user);
    // res.status(201).json(user);
}

const update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();  // id 가 정수가 아닐 경우 400

    const name = req.body.name;
    if (!name) return res.status(400).end();


    // if (!user) return res.status(404).end();
    // if (isConflict) return res.status(409).end();

    models.User
        .findOne({where: {id}})
        .then(user => {
            if (!user) return res.status(404).end();

            user.name = name;
            user.save()
                .then(_ => {
                    res.json(user);
                })
                .catch(err => {
                    if (err.parent.errno === 19) {
                        return res.status(409).end();
                    }
                    res.status(500).end();
                })
        })
}

module.exports = {
    // ES6 문법.
    index, show, destroy, create, update

    /**
     * ES6 이전 문법
     * index: index,
     * show: show,
     * destroy: destroy,
     * create: create,
     * update: update
     */
}