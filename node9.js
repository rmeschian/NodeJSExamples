// Making a call to another server using restler

import express from 'express';
import axios from 'axios';

const app = express();

app.get('/infoFromAnotherServer', async (req, res, next) => {
    // Make sure you are running the node7.js example on port 3002
    try {
        const result = await axios.get('http://localhost:3002/getMyFile/node7.js');
        res.send(result.data);
    } catch (error) {
        next(error);
    }
});

app.listen(3001, () => {
    console.log('Server started!');
});