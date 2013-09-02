// Using the Express framework

var http = require('http'),
    express = require('express'),
    app = express();

app.get('/hello', function(req, res){
    res.send('Hello World');
});

app.get('/bye', function(req, res){
    res.send('Goodbye World');
});

app.get('/info/:id', function(req, res){
    res.json({
        title: "Info about "+req.params.id
    });
});

app.get('/data', function(req, res){
    res.json({
        title: req.params('name')
    });
});

http.createServer(app).listen(3001, function() {
    console.log("Server started!");
});


// remember to install express
// remember nodemon