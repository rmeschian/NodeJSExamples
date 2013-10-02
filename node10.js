// Express in some detail

var express = require('express'),
    http = require('http'),
    path = require('path'),
    fs = require('fs');

var app = express();


app.set('port', process.env.PORT || 3001);
app.use(express.favicon()); // specify path to your icon.ico
app.use(express.logger('dev'));
app.use(express.bodyParser()); // express.json(), express.urlencoded() and  express.multipart()
app.use(express.compress()); // gzip output
app.use(express.methodOverride()); // allow use of other http methods (see form.html)
app.use(express.cookieParser('your secret here'));
app.use(express.session());

//    MongoStore = require('connect-mongo')(express);
//    app.use(express.session({
//        secret: settings.cookie_secret,
//        store: new MongoStore({
//            db: settings.db
//        })
//    }));

app.use(app.router); // use get/post/etc routes first...
app.use(express.static(path.join(__dirname, 'public')));

// development only
if(app.get('env') == 'development') {  // export NODE_ENV=production
    app.use(express.errorHandler({showStack : true, dumpExceptions : true}));
}


// Sessions and very basic authentication
app.get('/', function(req, res, next) {
    if(!req.session.user)
        res.redirect('/login.html');
    else
        res.send('Welcome, authenticated user ' + req.session.user.username);
});

app.post('/login', function(req, res, next) {
    // authenticate the user
    if(req.body.username === 'rmeschian' && req.body.password === '123') {
        req.session.user = req.body;
    }
    res.redirect('/');
});


app.get('/logout', function(req, res, next) {
    // authenticate the user
    delete req.session.user;
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


// 404
app.use(function(req, res) {
    res.status(404).sendfile(path.join(__dirname, 'public/404.html'));
});


http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
