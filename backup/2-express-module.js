/**
 * 익스프레스 인스턴스를 어플리케이션이라 한다
 * 서버에 필요한 기능인 미들웨어를 어플리케이션에 추가한다
 * 라우팅 설정을 할 수 있다
 * 서버를 요청 대기 상태로 만들 수 있다
 */

const express = require('express');
const app = express();  // application



/**
 * 미들웨어
 * 미들웨어는 함수들의 연속이다. (app.use 차례로 실행됨)
 * 로깅 미들웨어 만들어보기
 * 써드파티 미들웨어 사용해보기
 * 일반 미들웨어 vs 에러 미들웨어
 * 404, 500 에러 미들웨어를 만들어보기
 */

// 로깅 미들웨어 만들어보기
function logger(req, res, next) {
    // 미들웨어는 인터페이스가 정해져있다. [req, res, next] 필요
    console.log('I am logger');
    next();
}
function logger2(req, res, next) {
    console.log('I am logger2');
    next();
}
app.use(logger);  // 미들웨어 추가엔 use 함수 사용
app.use(logger2);

// 써드파티 미들웨어 사용해보기
// `$ npm install morgan` 선행
const morgan = require('morgan');  // morgan: log middleware
app.use(morgan('dev'));

// 에러 미들웨어
function commonMiddleWare(req, res, next) {
    console.log('common middle ware');
    // next();
    next(new Error('error occured'));  // 에러를 발생시키는 미들웨어
}
function errorMiddleWare(err, req, res, next) {
    // 에러를 처리하는 미들웨어는 인자가 4개가 된다 [err, req, res, next]
    // 에러 미들웨어는 err 없다면 호출되지 않는 미들웨어이다.
    console.log('error message: ' + err.message);

    // 에러를 처리하거나 next.
    next();
}
app.use(commonMiddleWare);
app.use(errorMiddleWare);

// 라우팅




app.listen(3000, () => {
    console.log('Server is running');
})