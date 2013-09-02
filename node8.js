// Serving static files with Express

var http = require('http'),
    express = require('express'),
    app = express(),
    path = require('path');


// location of static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/getMyFile/*', function(req, res){
    var fileName = path.basename(req.url);
    res.sendfile(path.join(__dirname, fileName)); // /getMyFile/node7.js
});


http.createServer(app).listen(3001, function() {
    console.log("Server started!");
});



// demonstrate creating an express application using 'express'


