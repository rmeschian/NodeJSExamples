// Express body parsing
// 1. manual parsing
// 2. create a route for parsing to make things easier
// 3. use the body-parser router from express


import express from 'express';
import path from 'path';

const __dirname = path.resolve();

const app = express();

// import bodyParser from 'body-parser';
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended : true
// }));

// location of static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.redirect('/login.html');
});

app.post('/login', (req, res, next) => {
    // req.method === 'POST'

    let body = '';
    req.on('data', (data) => {
        body += data;

        // Too much POST data, kill the connection!
        if (body.length > 1000000) { req.connection.destroy(); }
    });
    req.on('end', () => {
        // body is now: username=rmeschian&password=123

        const bodyObj = {};
        body.split('&').forEach((pairVals) => {
            const pair = pairVals.split('=');
            bodyObj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        });

        req.body = bodyObj;

        // authenticate
        if (req.body.username === 'rmeschian' && req.body.password === '123') {
            res.redirect('/hello.html');
        } else {
            res.redirect('/');
        }
    });
});

app.listen(3001, () => {
    console.log('Server started');
});