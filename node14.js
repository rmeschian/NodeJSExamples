// math server

// DEBUGGING

// npm install -g node-inspector
// node-debug node12.js

import http from 'http';
import url from 'url';
import querystring from 'querystring';

const httpServer = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url);
    const parsedQuery = querystring.parse(parsedUrl.query);
    console.log(parsedQuery);

    if(parsedUrl.pathname === '/add') {
        res.end(`${parseFloat(parsedQuery.left) + parseFloat(parsedQuery.right)}`);
        return;
    } else if(parsedUrl.pathname === '/subtract') {
        res.end(`${parseFloat(parsedQuery.left) - parseFloat(parsedQuery.right)}`);
        return;
    }

    res.end('Nothing matched');
});

httpServer.listen(3001); // start server and have it listen on port 3001