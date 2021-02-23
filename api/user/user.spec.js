// 테스트 코드

const request = require('supertest');
const should = require('should');

const app = require('../../index');

describe('GET /users 는', () => {
    describe('성공 시', () => {
        it('유저 객체를 담은 배열로 응답한다.', (done) => {
            // 비동기 함수를 테스트할 땐,
            // done 함수를 콜백으로 받아 테스트 케이스 마지막에 실행해야 한다.
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    done();
                });
        });

        it('최대 limit 갯수 만큼 응답한다.', (done) => {
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    res.body.should.have.lengthOf(2);
                    done();
                })
        })
    });

    describe('실패 시', () => {
        it('limit 이 숫자형이 아니면 400을 응답한다', (done) => {
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done);
        })
    })
});

describe('GET /users/:id 는', () => {
    describe('성공 시', () => {
        it('id가 1인 객체를 반환한다', (done) => {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    // res 의 body 는 id property 를 갖고 그 값은 1 이어야 한다.
                    res.body.should.have.property('id', 1)
                    done();
                })
        })
    })
    describe('실패 시', () => {
        it('id가 숫자가 아닐 경우 400으로 응답한다', (done) => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done);
        })
        it('id로 유저를 찾을 수 없을 경우 404로 응답한다', (done) => {
            request(app)
                .get('/users/999')
                .expect(404)
                .end(done);
        })
    })
});

describe('DELETE /users/:id', () => {
    describe('성공 시', () => {
        it('204 응답한다', (done) => {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done);
        })
    })

    describe('실패 시', () => {
        it('id가 숫자가 아닐 경우 400으로 응답한다.', (done) => {
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done);
        })
    })
})

describe('POST /users', () => {
    describe('성공 시', () => {
        let name = 'daniel',
            body,
            status;

        // it() 테스트 케이스가 실행되기 전에 필요한 준비 과정을 before() 함수에서 수행한다.
        before((done) => {
            request(app)
                .post('/users')
                .send({
                    name: name
                })
                .end((err, res) => {
                    body = res.body;
                    status = res.status;
                    done();
                })
        })
        it('상태코드 201로 응답한다', () => {
            status.should.be.equal(201);
        })
        it('생성된 유저 객체를 반환한다', () => {
            body.should.have.property('id');
        })
        it('입력한 name 을 반환한다', () => {
            body.should.have.property('name', name);
        })
    })

    describe('실패 시', () => {
        it('name 파라미터 누락시 400을 반환한다', (done) => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done);
        })
        it('name 이 중복일 경우 409를 반환한다', (done) => {
            request(app)
                .post('/users')
                .send({name: 'daniel'})
                .expect(409)
                .end(done);
        })
    })
})

describe('PUT /users/:id', () => {
    describe('성공 시', () => {
        const name = 'charlie';
        it('변경된 name 을 응답한다', (done) => {
            request(app)
                .put('/users/3')
                .send({name})
                .end((err, res) => {
                    res.body.should.have.property('name', name);
                    done();
                })
        })
    })

    describe('실패 시', () => {
        it('정수가 아닌 id 일 경우 400을 응답한다', (done) => {
            request(app)
                .put('/users/one')
                .expect(400)
                .end(done)
        })

        it('name이 없을 경우 400을 응답한다', (done) => {
            request(app)
                .put('/users/1')
                .send({})
                .expect(400)
                .end(done)
        })

        it('없는 유저일 경우 404를 응답한다', (done) => {
            request(app)
                .put('/users/999')
                .send({
                    name: 'foo'
                })
                .expect(404)
                .end(done)
        })

        it('이름이 중복일 경우 409를 응답한다.', (done) => {
            request(app)
                .put('/users/3')
                .send({
                    name: 'bek'
                })
                .expect(409)
                .end(done)
        })
    })
})