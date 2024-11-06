const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url, true);
    const query = parsedUrl.query;

    // Обработка параметра ?hello=<name>
    if (query.hello !== undefined) {
        if (query.hello) {
            // Если передано имя
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end(`Hello, ${query.hello}.`);
        } else {
            // Если параметр `hello` указан, но имя не передано
            response.writeHead(400, { 'Content-Type': 'text/plain' });
            response.end('Enter a name');
        }
    } else if (query.users !== undefined) {
        // Обработка параметра ?users
        fs.readFile('src/data/users.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err)
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'Error reading users file' }));
            } else {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(data);
            }
        });
        
    } else if (Object.keys(query).length === 0) {
        // Обработка запроса без параметров
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end('Hello, World!');
    } else {
        // Обработка неизвестных параметров
        response.writeHead(500);
        response.end();
    }
});

server.listen(3003, '127.0.0.1', () => {
    console.log('Server is running at http://127.0.0.1:3003');
});
