# Javascript 

This tutorial is designed for those who have a basic understanding of javascript. It incluses basic as well as advanced concepts of javascript.
It also covers some key features of ES6 and ES7

## 1. Scope

### Introduction
### Lexical Scope
### Different Scope
### Use Case


## 2. Closures

### Introduction
### Use Cases


## 3. Variables

### var(ES5)
### let(ES6)
### const(ES6)
### defineProperty
### destructuring(ES6)
### spread(ES6)
### rest(ES6)

## 4. Symbols(ES6)

### Introduction
### Use Cases


## 5. Types

### Primitive
### Non-Primitive


## 6. Object Properties

### enumerable
### iterable
### writable
### configurable
### L-value


## 7. Object

### Different ways to create object
### delete
### Object.is(ES6)
### Object.assign(ES6)
### Object shorthand and computed properties(ES6)
### Proxies(ES6)
### Proxing Functions(ES6)


## 8. Build In Objects

### Array
### Math
### Number
### Set(ES6)
### WeakSet(ES6)
### Map(ES6)
### WeakMap(ES6)

	
## 9. Functionals

### Prototype and Chaining
### Function/eval/with
### Arrow Function(ES6)
### Iterator
### Generators(ES6)
### for of and Iterator(ES6)
### Functor and Monards


## 10. Class(ES6)

### Constructor
### get and set
### Inheritance
### static
### super
### overrides


## 11. Modules

### IIFE(ES5)
### AMD
### Node/CommonJS
### ES6


## 12. Asynchronous Programming

### Callback
### Promise(ES6)
### Asynchronous Generators(ES6)

```javascript
const isPromise = obj => Boolean(obj) && typeof obj.then === 'function';

const next = (iter, callback, prev = undefined) => {
  const item = iter.next(prev);
  const value = item.value;

  if (item.done) return callback(prev);

  if (isPromise(value)) {
    value.then(val => {
      setImmediate(() => next(iter, callback, val));
    });
  } else {
    setImmediate(() => next(iter, callback, value));
  }
};

const gensync = (fn) =>
    (...args) => new Promise(resolve => {
  next(fn(...args), val => resolve(val));
});

/* How to use gensync() */

const fetchSomething = () => new Promise((resolve) => {
  setTimeout(() => resolve('future value'), 500);
});

const asyncFunc = gensync(function* () {
  const result = yield fetchSomething(); // returns promise

  // waits for promise and uses promise result
  yield result + ' 2';
});

// Call the async function and pass params.
asyncFunc('param1', 'param2', 'param3')
  .then(val => console.log(val)); // 'future value 2'
```
### Async and Await(ES7)


## 13. Inheritance Design Patterns

### Functional Prototype
### OOLO
### Classes(ES6)


## 14. Polyfills

### Object.assign
### Object.create