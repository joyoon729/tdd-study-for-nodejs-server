const e = require('express');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    // 이 콜백의 req, res 는 Express 에서 래핑한 request, response 객체이다.
    res.send('Hello World\n');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000');
})

/**
 * HTTP Status code --------
 * 1xx: 아직 처리 중
 * 2xx: 자, 여기있어!
 * 3xx: 잘 가~
 * 4xx: 니가 문제임
 * 5xx: 내가 문제임
 * -------------------------
 * 200: 성공 (Success), GET, PUT
 * 201: 작성됨 (Created), POST
 * 204: 내용 없음 (No Content), DELETE
 * 400: 잘못된 요청 (Bad Request)
 * 401: 권한 없음 (Unauthorized)
 * 404: 찾을 수 없음 (Not Found)
 * 409: 충돌 (Conflict)
 * 500: 서버 에러 (Internal Server Error)
 * 
 */