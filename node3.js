// some modules come with nodejs
var path = require('path');

var filePath = path.join('foo', 'bar/zoo', 'file.js');
console.log('File path: ' + filePath);
console.log('Dirname' + path.dirname(filePath));
console.log('Basename' + path.basename(filePath));
