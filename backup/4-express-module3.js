const express = require('express');
const app = express();
const morgan = require('morgan');  // logger middle ware

let users = [
    {id: 1, name: 'alice'},
    {id: 2, name: 'bek'},
    {id: 3, name: 'chris'},
];

app.use(morgan('dev'));

app.get('/users', (req, res) => {
    res.json(users);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000');
})

```
$ curl -X GET 'localhost:3000/users' -v
Note: Unnecessary use of -X or --request, GET is already inferred.
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 3000 (#0)
> GET / HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.64.1
> Accept: */*
>
< HTTP/1.1 404 Not Found
< X-Powered-By: Express
< Content-Security-Policy: default-src 'none'
< X-Content-Type-Options: nosniff
< Content-Type: text/html; charset=utf-8
< Content-Length: 139
< Date: Fri, 05 Feb 2021 08:59:23 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
<
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /</pre>
</body>
</html>
* Connection #0 to host localhost left intact
* Closing connection 0

curl 명령어 결과에서
'>' 표시는 요청,
'<' 표시는 응답을 의미
```