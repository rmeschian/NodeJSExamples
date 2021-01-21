// create and use modules (put code in other files and re-use them as you like)

import sayHi from './my_modules/module1.js';
import { f, foo, hello, age } from './my_modules/module1.js';

f();
foo();
hello();
console.log(age);

sayHi('Maks');
