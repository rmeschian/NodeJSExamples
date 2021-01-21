// Some modules come with nodejs, such as 'path' and 'fs'

import path from 'path';
import fs from 'fs';

const __dirname = path.resolve();

const filePath = path.join(__dirname, 'public/hello.html');

console.log('Path information:');
console.log(`Dirname: ${path.dirname(filePath)}`);
console.log(`Basename: ${path.basename(filePath)}`);

fs.access(filePath, (err) => {
    if (err) {
        return console.error(`File ${filePath} does not exist`);
    }

    fs.readFile(filePath, 'utf8', (readFileError, data) => {
        if (err) {
            return console.error(readFileError);
        }
        console.log(data);
    });
});
