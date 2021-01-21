// Serving static files with Express

import express from 'express';
import path from 'path';

const app = express();
const __dirname = path.resolve();

// location of static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/getMyFile/*', (req, res) => {
    const fileName = path.basename(req.url);
    res.sendFile(path.join(__dirname, fileName)); // /getMyFile/node7.js
});


app.listen(3001, () => {
    console.log('Server started!');
});





