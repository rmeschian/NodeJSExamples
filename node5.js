// Routing...?

var http = require('http');
http.createServer(function(req, res) {
    if(req.url === '/hello') {
        res.writeHead(200, {'Content-Type' : 'text/plain'});
        res.end('Hello World\n');
    } else {
        res.writeHead(404, {'Content-Type' : 'text/plain'});
        res.end("Nope!");
    }
}).listen(3001, '127.0.0.1');

// ... maybe we should use a framework ...