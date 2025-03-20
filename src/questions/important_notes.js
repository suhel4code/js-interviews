// What is the difference between document load and DOMContentLoaded events
/* The DOMContentLoaded event is fired when the initial HTML document 
has been completely loaded and parsed, without waiting for 
assets(stylesheets, images, and subframes) to finish loading.
 Whereas The load event is fired when the whole page has loaded, 
 including all dependent resources(stylesheets, images).

 */

/*
 How do you redirect new page in javascript
In vanilla javascript, you can redirect to a new page using the 
location property of window object. The syntax would be as follows,
 */

function redirect() {
  window.location.href = "newPage.html";
}

/*
How do you get the current url with javascript
You can use window.location.href expression to get the current url 
path and you can use the same expression for updating the URL too. 
You can also use document.URL for read-only purposes but this solution 
has issues in FF.

*/

console.log("location.href", window.location.href); // Returns full URL

// What are asynchronous thunks
// The asynchronous thunks are useful to make network requests.
// Let's see an example of network requests,

function fetchData(fn) {
  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .then((json) => fn(json));
}

const asyncThunk = function () {
  return fetchData(function getData(data) {
    console.log(data);
  });
};

asyncThunk();

// How do you remove falsy values from an array
// You can apply the filter method on the array by passing Boolean as a
// parameter. This way it removes all falsy values(0, undefined, null,
// false and "") from the array

const myArray = [false, null, 1, 5, undefined];
myArray.filter(Boolean); // [1, 5] // is same as myArray.filter(x => x);

// Is it possible to add CSS to console messages
// Yes, you can apply CSS styles to console messages similar to html
// text on the web page.
console.log(
  "%c The text has blue color, with large font and red background",
  "color: blue; font-size: x-large; background: red"
);

// What is the purpose of dir method of console object
// The console.dir() is used to display an interactive list of the
// properties of the specified JavaScript object as JSON.
const user = { name: "John", id: 1, city: "Delhi" };
console.dir(user);

// How do you display data in a tabular format using console object
// The console.table() is used to display data in the console in a
// tabular format to visualize complex arrays or objects.
const users = [
  { name: "John", id: 1, city: "Delhi" },
  { name: "Max", id: 2, city: "London" },
  { name: "Rod", id: 3, city: "Paris" },
];
console.table(users);

// What is the shortcut to get timestamp
// You can use new Date().getTime() to get the current timestamp.
// There is an alternative shortcut to get the value.
console.log(+new Date());
console.log(Date.now());

//How to cancel a fetch request

// Until a few days back, One shortcoming of native promises is
// no direct way to cancel a fetch request. But the new AbortController
// from js specification allows you to use a signal to abort one or
//  multiple fetch calls. The basic flow of cancelling a fetch request
// would be as below,

// Create an AbortController instance
// Get the signal property of an instance and pass the signal as a
// fetch option for signal
// Call the AbortController's abort property to cancel all fetches
// that use that signal For example, passing the same signal to
// multiple fetch calls will cancel all requests with that signal,

const controller = new AbortController();
const { signal } = controller;

fetch("http://localhost:8000", { signal })
  .then((response) => {
    console.log(`Request 1 is complete!`);
  })
  .catch((e) => {
    if (e.name === "AbortError") {
      // We know it's been canceled!
    }
  });

fetch("http://localhost:8000", { signal })
  .then((response) => {
    console.log(`Request 2 is complete!`);
  })
  .catch((e) => {
    if (e.name === "AbortError") {
      // We know it's been canceled!
    }
  });

// Wait 2 seconds to abort both requests
setTimeout(() => controller.abort(), 2000);

// How do you make an object iterable in javascript

// By default, plain objects are not iterable. But you can make the object
// iterable by defining a Symbol.iterator property on it.

// Let's demonstrate this with an example,

const collection = {
  one: 1,
  two: 2,
  three: 3,
  [Symbol.iterator]() {
    const values = Object.keys(this);
    let i = 0;
    return {
      next: () => {
        return {
          value: this[values[i++]],
          done: i > values.length,
        };
      },
    };
  },
};

const iterator = collection[Symbol.iterator]();

console.log(iterator.next()); // → {value: 1, done: false}
console.log(iterator.next()); // → {value: 2, done: false}
console.log(iterator.next()); // → {value: 3, done: false}
console.log(iterator.next()); // → {value: undefined, done: true}

// Or using generator function
const collection = {
  one: 1,
  two: 2,
  three: 3,
  [Symbol.iterator]: function* () {
    for (let key in this) {
      yield this[key];
    }
  },
};
const iterator = collection[Symbol.iterator]();
console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: undefined, done: true}

// What is the difference between isNaN and Number.isNaN?

//  isNaN: The global function isNaN converts the argument to a
// Number and returns true if the resulting value is NaN.
//  Number.isNaN: This method does not convert the argument.
// But it returns true when the type is a Number and value is NaN.

// Let's see the difference with an example,
isNaN(‘hello’);   // true
Number.isNaN('hello'); // false
