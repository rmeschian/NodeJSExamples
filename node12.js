// Express with ejs templates

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var session = require('express-session');
var methodOverride = require('method-override')
var fs = require('fs');

var app = express();



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// parse content of the packet
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}));

// parse cookies stored in the header
app.use(cookieParser()); // allows us to work with cookies

// add sessions to requests
app.use(session({
        secret            : 'keyboard cat',
        saveUninitialized : true,
        resave            : true
    })
);

// Trick to allow PUT to be called on form submission rather than just POST
// -try form.html
app.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}));

app.use(compression());

//// Using MongoDB as a session store
//var MongoStore = require('connect-mongo')(express);
//app.use(session({
//    secret : 'keyboard cat',
//    store  : new MongoStore({
//        db : 'sample1'
//    })
//}));


app.use(express.static(path.join(__dirname, 'public')));


// Sessions and very basic authentication
app.get('/', function(req, res, next) {
    if(!req.session.user)
        res.redirect('/login.html');
    else
        res.send('Welcome, authenticated user ' + req.session.user.username);
});

app.post('/login', function(req, res, next) {
    if(req.body.username === 'rmeschian' && req.body.password === '123')
        req.session.user = req.body;

    res.redirect('/');
});


app.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect('/');
});


// Cookies
app.get('/write/cookies/:data', function(req, res, next) {
    res.cookie('armenia', req.params.data, { maxAge : 900000, httpOnly : false});
    res.send('Set cookie armenia to value ' + req.params.data);
});

app.get('/read/cookies', function(req, res, next) {
    res.send('The value for "armenia" value is "' + req.cookies.armenia + '"');
});


// bodyParser + methodOverride - form.html
app.post('/saveData1', function(req, res, next) {
    res.end('Got data in POST: ' + JSON.stringify(req.body));
});

app.put('/saveData1', function(req, res, next) {
    res.end('Got data in PUT: ' + JSON.stringify(req.body));
});

app.get('/template', function(req, res, next) {
    res.render('index', { title: 'This is a template' })
});


// Protected static files
app.get('/private/*', function(req, res, next) {
    fs.exists('.' + req.url, function(exists) {

        if(exists) {

            if(req.session.user) {
                res.sendfile('.' + req.url);
            } else {
                next(new Error('Access denied'));
            }

        } else {
            next();
        }

    });
});



app.listen(3001, function() {
    console.log('Server started');
});


// npm install -g express-generator
// express -help


// DEBUGGING

// npm install -g node-inspector
// node-debug node12.js