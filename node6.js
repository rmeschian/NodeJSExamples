// Using the Express framework

import express from 'express';

const app = express();

app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.get('/hello', (req, res, next) => {
    res.send('<h1>Hello World</h1>');
});

app.get('/bye', (req, res, next) => {
    res.send('Goodbye World');
});

// parameter as part of the path
app.get('/info/:id', (req, res, next) => {
    res.json({
        title: `Info about path ${req.params.id}`,
    });
});

// parameter as argument  /info?id=hello
app.get('/info', (req, res, next) => {
    res.json({
        title: `Info about argument ${req.query.id}`,
    });
});

app.get('/data', (req, res, next) => {
    res.json({
        title: req.query.name,
    });
});

app.use((req, res, next) => {
    console.log('not found!');
    res.send('NOT FOUND!!!');
});

app.listen(3001, () => {
    console.log('Server started!');
});

// use "nodemon" to keep the server updated with code changes
// npm install nodemon