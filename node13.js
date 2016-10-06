// basic static file server

const fs = require('fs');
const path = require('path');
const http = require('http');

const staticBasePath = './public'; // directory from which we will server out files

const httpServer = http.createServer(function(req, res) {

    const targetFileLoc = path.join(staticBasePath, req.url);

    fs.readFile(targetFileLoc, function(err, data) {
        if (err) {
            res.writeHead(404, 'Not Found');
            res.write('404: File Not Found!');
            return res.end();
        }

        res.statusCode = 200;

        res.write(data);
        return res.end();
    });
});

httpServer.listen(3001); // start server and have it listen on port 3001