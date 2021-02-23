// api 로직

let users = [
    {id: 1, name: 'alice'},
    {id: 2, name: 'bek'},
    {id: 3, name: 'chris'},
];

const index = (req, res) => {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if (Number.isNaN(limit)) return res.status(400).end();
    res.json(users.slice(0, limit));
}

const show = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const user = users.filter(user => user.id === id)[0];
    if (!user) return res.status(404).end();

    res.json(user);
}

const destroy = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    users = users.filter(user => user.id !== id);
    
    res.status(204).end();
}

const create = (req, res) => {
    const name = req.body.name;
    const id = Date.now();
    const user = { id, name };

    if (!name) return res.status(400).end();  // name 누락 시 400
    const isConflict = (users.filter(user => user.name === name).length)
    if (isConflict) return res.status(409).end();

    users.push(user);
    res.status(201).json(user);
}

const update = (req, res) => {
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