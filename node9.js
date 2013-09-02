// Making a call to another server using restler

var http = require('http'),
    express = require('express'),
    app = express(),
    rest = require('restler');

app.get("/infoFromAnotherServer", function(req, res, next) {
    rest.get('http://google.com').on('complete', function(result) {
        if (result instanceof Error) {
            next(result);
        } else {
            res.send(result);
        }
    });
});

http.createServer(app).listen(3001, function() {
    console.log("Server started!");
});


