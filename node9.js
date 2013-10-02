// Making a call to another server using restler


var http = require('http'),
    express = require('express'),
    rest = require('restler');

var app = express();


app.get('/infoFromAnotherServer', function(req, res, next) {

    // Make sure you are running the node7.js example on port 3002
    rest.get('http://localhost:3002/getMyFile/node7.js').on('complete', function(result) {

        if(result instanceof Error) {
            next(result);
        } else {
            res.send(result);
        }

    });
});


http.createServer(app).listen(3001, function() {
    console.log('Server started!');
});


