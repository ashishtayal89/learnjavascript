<div><a href="https://github.com/ashishtayal89/learnjavascript#readme">Home</a></div>

# Asynchronous Programming

<div id="callback"><div>

## Callback

## Promise(ES6)

- Promisification

```javascript
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}
// usage:
// loadScript('path/script.js', (err, script) => {...})

function promisify(f) {
  return function(...args) {
    // return a wrapper-function (*)
    return new Promise((resolve, reject) => {
      function callback(err, result) {
        // our custom callback for f (**)
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // append our custom callback to the end of f arguments

      f.call(this, ...args); // call the original function
    });
  };
}

// usage:
// let loadScriptPromise = promisify(loadScript);
// loadScriptPromise(...).then(...);
```

## Asynchronous Generators(ES6)

```javascript
const isPromise = obj => Boolean(obj) && typeof obj.then === "function";

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

const gensync = fn => (...args) =>
  new Promise(resolve => {
    next(fn(...args), val => resolve(val));
  });

/* How to use gensync() */

const fetchSomething = () =>
  new Promise(resolve => {
    setTimeout(() => resolve("future value"), 500);
  });

const asyncFunc = gensync(function*() {
  const result = yield fetchSomething(); // returns promise

  // waits for promise and uses promise result
  yield result + " 2";
});

// Call the async function and pass params.
asyncFunc("param1", "param2", "param3").then(val => console.log(val)); // 'future value 2'
```

### Async and Await(ES7)
