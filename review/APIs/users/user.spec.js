// user.ctrl test code

const request = require('supertest');
const should = require('should');

const app = require('../../index');
const models = require('../../models/models');

describe('GET /users :::', () => {
    before(async () => {
        await models.sequelize.sync({force: true});
        const users = [
            {name: 'alice', age: 21},
            {name: 'booker', age: 25},
            {name: 'chris', age: 23}
        ]
        await models.User.bulkCreate(users)
    })
    describe('성공 시', () => {
        it('유저 객체를 담은 배열로 응답한다.', done => {
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    done();
                });
        });

        it('최대 limit 갯수만큼 응답한다.', done => {
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    res.body.should.have.lengthOf(2);
                    done();
                })
        })
    })

    describe('실패 시', () => {
        it('limit 이 숫자형이 아니면 400을 응답한다.', done => {
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done);
        })
    })
})

describe('GET /users/:id :::', () => {
    before(async () => {
        await models.sequelize.sync({force: true});
        const users = [
            {name: 'alice', age: 21},
            {name: 'booker', age: 25},
            {name: 'chris', age: 23}
        ]
        await models.User.bulkCreate(users)
    })
    describe('성공 시', () => {
        it('id가 2인 객체를 응답한다', done => {
            request(app)
                .get('/users/2')
                .end((err, req) => {
                    req.body.should.have.property('id', 2)
                    done();
                })
        })
    })

    describe('실패 시', () => {
        it('id가 숫자가 아닐 경우 400을 응답한다.', done => {
            request(app)
                .get('/users/two')
                .expect(400)
                .end(done)
        })
        it('id를 찾을 수 없는 경우 404를 응답한다.', done => {
            request(app)
                .get('/users/999')
                .expect(404)
                .end(done)
        })
    })
})

describe('POST /users :::', () => {
    // NOTICE: 2021.3.4. 인프런 질문 올림
    // before(() => {
    //     models.sequelize.sync({force: true});
    //     const users = [
    //         {name: 'alice', age: 21}, 
    //         {name: 'booker', age: 25},
    //         {name: 'chris', age: 23}
    //     ];
    //     models.User.bulkCreate(users)
    // });
    //
    // NOTICE: 인프런 답변 (async/await 사용)
    before(async () => {
        await models.sequelize.sync({force: true});
        const users = [
            {name: 'alice', age: 21},
            {name: 'booker', age: 25},
            {name: 'chris', age: 23}
        ]
        await models.User.bulkCreate(users)
    })

    // before(() => models.sequelize.sync({force: true}));
    // const users = [
    //     {name: 'alice', age: 21}, 
    //     {name: 'bek', age: 25}, 
    //     {name: 'chris', age: 23}
    // ];
    // before(() => models.User.bulkCreate(users));


    describe('성공 시', () => {
        let name = 'daniel',
            status,
            body

        before(done => {
            request(app)
                .post('/users')
                .send({
                    name: name,
                    age: 17
                })
                .end((err, res) => {
                    status = res.status;
                    body = res.body;
                    done();
                })
        })
        it('201을 응답한다.', () => {
            status.should.be.equal(201);
        })
        it('생성된 유저 객체를 반환한다.', () => {
            body.should.have.property('id');
        })
        it('입력한 name을 반환한다.', () => {
            body.should.have.property('name', name);
        })
    })
    describe('실패 시', () => {
        it('name 파라미터 누락 시 400을 응답한다.', done => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done)
        })
        it('name이 중복일 경우 409를 응답한다.', done => {
            request(app)
                .post('/users')
                .send({
                    name: 'daniel',
                    age: 17
                })
                .expect(409)
                .end(done)
        })
    })
})

describe('PUT /users/:id :::', () => {
    before(async () => {
        await models.sequelize.sync({force: true});
        const users = [
            {name: 'alice', age: 21},
            {name: 'booker', age: 25},
            {name: 'chris', age: 23}
        ];
        models.User.bulkCreate(users);
    })
    const name = 'newName'
    const age = 19
    describe('성공 시', () => {
        it('변경된 객체를 응답한다.', done => {
            request(app)
                .put('/users/2')
                .send({
                    name, age
                })
                .end((err, res) => {
                    res.body.should.have.property('name', name)
                    done();
                })
        })
    })
    describe('실패 시', () => {
        it('정수가 아닌 id 일 경우 400을 응답한다.', done => {
            request(app)
                .put('/users/two')
                .expect(400)
                .end(done)
        })
        it('name이 없을 경우 400을 응답한다.', done => {
            request(app)
                .put('/users/2')
                .send({age})
                .expect(400)
                .end(done)
        })
        it('age가 없을 경우 400을 응답한다.', done => {
            request(app)
                .put('/users/2')
                .send({name})
                .expect(400)
                .end(done)
        })
        it('없는 유저일 경우 404를 응답한다.', done => {
            request(app)
                .put('/users/999')
                .send({
                    name, age
                })
                .expect(404)
                .end(done)
        })
        it('이름이 중복일 경우 409를 응답한다.', done => {
            request(app)
                .put('/users/3')
                .send({
                    name: 'newName',
                    age: 17
                })
                .expect(409)
                .end(done)
        })
    })
})

describe('DELETE /users/:id :::', () => {
    // before(async () => {
    //     await models.sequelize.sync({force: true});
        // const users = [
        //     {name: 'alice', age: 21},
        //     {name: 'booker', age: 25},
        //     {name: 'chris', age: 23}
        // ];
    //     models.User.bulkCreate(users);
    // })
    before(() => models.sequelize.sync({force: true}));
    const users = [
        {name: 'alice', age: 21},
        {name: 'booker', age: 25},
        {name: 'chris', age: 23}
    ];
    before(() => models.User.bulkCreate(users));
    describe('성공 시', () => {
        it('204를 응답한다.', done => {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done)
        })
    })
    describe('실패 시', () => {
        it('id가 숫자가 아닐 경우 400을 응답한다.', done => {
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done)
        })
        it('id가 없을 경우 404를 응답한다.', done => {
            request(app)
                .delete('/users/999')
                .expect(404)
                .end(done)
        })
    })
})