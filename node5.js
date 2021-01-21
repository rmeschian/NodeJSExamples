// Routing

import http from 'http';

const httpServer = http.createServer((req, res) => {
    if (req.url === '/hello') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World\n');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Nope!');
    }
});

httpServer.listen(3001); // start listening on port 3001

// ... maybe we should use a framework ...
