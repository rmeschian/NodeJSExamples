// Using the Express framework

var express = require('express');

var app = express();


app.use(function(req, res, next) {
    console.log(req.url);
    next();
});

app.get('/hello', function(req, res, next) {
    res.send('<h1>Hello World</h1>');
});

app.get('/bye', function(req, res, next) {
    res.send('Goodbye World');
});


// parameter as part of the path
app.get('/info/:id', function(req, res, next) {
    res.json({
        title : "Info about path " + req.params.id
    });
});

// parameter as argument  /info?id=hello
app.get('/info', function(req, res, next) {
    res.json({
        title : "Info about argument " + req.param('id')
    });
});

app.get('/data', function(req, res) {
    res.json({
        title : req.param('name')
    });
});

app.use(function(req, res, next) {
    console.log("not found!");
    res.send("NOT FOUND!!!");
});

app.listen(3001, function() {
    console.log("Server started!");
});

// use "nodemon" to keep the server updated with code changes
// npm install nodemon

