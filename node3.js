// Some modules come with nodejs, such as 'path' and 'fs'

const path = require('path');
const fs = require('fs');

var filePath = path.join(__dirname, 'public/hello.html');

console.log("Path information:");
console.log('Dirname: ' + path.dirname(filePath));
console.log('Basename: ' + path.basename(filePath));


fs.exists(filePath, function(exists) {
    if(!exists) {
        return console.error('File ' + filePath + ' does not exist');
    }

    fs.readFile(filePath, 'utf8', function(err, data) {
        if(err) {
            return console.error(err);
        }
        console.log(data);
    });
});
