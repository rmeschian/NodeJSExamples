// basic static file server
// localhost:3001/yay.html  or puppy.jpg

import http from 'http';
import path from 'path';
import fs from 'fs';

const staticBasePath = './public'; // directory from which we will server out files

const httpServer = http.createServer((req, res) => {

    const targetFileLoc = path.join(staticBasePath, req.url);

    fs.readFile(targetFileLoc, function(err, data) {
        if (err) {
            res.writeHead(404, 'Not Found');
            res.write('404: File Not Found!');
            return res.end();
        }

        res.statusCode = 200;

        return res.end(data);
    });
});

httpServer.listen(3001); // start server and have it listen on port 3001