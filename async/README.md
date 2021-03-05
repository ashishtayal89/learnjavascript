# Notes

# Questions

## Convert a callback into promise

```javascript
const phoneList = ["Apple", "Samsung"];
const phoneDetail = {
  name: "Apple",
  color: "black",
  price: 100000
};

const fetchPhoneList = callback => {
  setTimeout(() => callback(phoneList), 2000);
};

const fetchPhoneDetail = callback => {
  setTimeout(() => callback(phoneDetail), 1000);
};

const afterDetailsFetch = details => console.log(details);

fetchPhoneList(() => {
  fetchPhoneDetail(details => afterDetailsFetch(details));
});

const fetchPhoneListPromise = () =>
  new Promise(resolve => setTimeout(() => resolve(phoneList), 2000));

const fetchPhoneDetailPromise = () =>
  new Promise(resolve => setTimeout(() => resolve(phoneDetail), 1000));

fetchPhoneListPromise()
  .then(fetchPhoneDetailPromise)
  .then(afterDetailsFetch);
```

## Promisification

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

## Tell the output

```javascript
function foo() {
  console.log("foo");
}
function bar() {
  setTimeout(foo);
  console.log("bar");
}
function baz() {
  setTimeout(() => console.log("baz"), 2000);
}
function app() {
  new Promise(r => r()).then(() => console.log("app"));
}
function liz() {
  setTimeout(() => console.log("liz"));
}
function rep() {
  Promise.resolve().then(() => console.log("rep"));
}
console.log("start");
foo();
bar();
baz();
app();
liz();
rep();
console.log("end");
```

```javascript
const isPromise = obj => Boolean(obj) && typeof obj.then === "function";

const next = (iter, callback, prev = undefined) => {
  const item = iter.next(prev);
  const value = item.value;

  if (item.done) return callback(prev);

  if (isPromise(value)) {
    value.then(val => {
      setTimeout(() => next(iter, callback, val));
    });
  } else {
    setTimeout(() => next(iter, callback, value));
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
