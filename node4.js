// Very basic server

import http from 'http';

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World haha, this is fun');
}).listen(3001);



// use "nodemon" to keep the server updated with code changes
// npm install nodemon
