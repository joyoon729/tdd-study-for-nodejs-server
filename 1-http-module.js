const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

    let message;
    res.setHeader('Content-Type', 'text/plain');

    switch (req.url) {
        case '/':
            res.statusCode = 200;
            message = 'This is root url';
            break;

        case '/users':
            res.statusCode = 200;
            message = 'This is users url';
            break;

        default:
            res.statusCode = 404;
            message = 'Not Found';
    }

    res.end('\n' + message + '\n\n');

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});