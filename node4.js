// Very basic server

var http = require('http');

http.createServer(function (req, res) {

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World');

}).listen(3001);


// use "nodemon" to keep the server updated with code changes
// npm install nodemon
