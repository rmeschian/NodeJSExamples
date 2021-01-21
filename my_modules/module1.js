
const f = () => {
    console.log('I am f funtion')
};

// export with defined name.
export { f };

// export with custom name.
export { f as foo };


const sayHi = (user) => {
    console.log(`Hello, ${user}!`);
}
// export as a default 
export default sayHi;


// export with defination
export function hello() {
    console.log("Hello World");
};

// export variable with defination
export const age = 18;


