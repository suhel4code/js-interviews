// ================================================
// What are First-Class Functions?
// ================================================
/*
In JavaScript, functions are called "first-class functions" because they are treated as "first-class citizens."
This means functions can be:
1. Assigned to variables,
2. Passed as arguments to other functions,
3. Returned from other functions,
4. Stored in data structures (like arrays or objects),
5. And have properties and methods.

This flexibility makes JavaScript a powerful language for functional programming and advanced techniques like closures and higher-order functions.
*/

// ================================================
// 1. Functions can be assigned to variables
// ================================================
/*
Functions can be treated like any other value, such as numbers or strings.
This means you can assign a function to a variable and call it later.
*/

// Assigning a function to the variable `greet`
const greet = function () {
  console.log("Hello, world!");
};

// Calling the function using the variable
greet(); // Output: Hello, world!

// ================================================
// 2. Functions can be passed as arguments to other functions
// ================================================
/*
Functions can be passed as arguments to other functions. This is a key feature of higher-order functions.
Higher-order functions are functions that take other functions as arguments or return them as results.
*/

// A higher-order function that takes another function as an argument
function executeFunction(fn, name) {
  fn(name); // Call the passed function with the provided argument
}

// A function to be passed as an argument
function greet(name) {
  console.log(`Hello, ${name}!`);
}

// Passing `greet` as an argument to `executeFunction`
executeFunction(greet, "Alice"); // Output: Hello, Alice!

// ================================================
// 3. Functions can be returned from other functions
// ================================================
/*
Functions can be returned from other functions. This is the basis of closures.
A closure is a function that "remembers" the environment in which it was created.
*/

// A function that returns another function
function createGreeter(greeting) {
  // Return a new function that uses the `greeting` parameter
  return function (name) {
    console.log(`${greeting}, ${name}!`);
  };
}

// Create a greeter function with a specific greeting
const sayHello = createGreeter("Hello");

// Use the returned function
sayHello("Bob"); // Output: Hello, Bob!

// ================================================
// 4. Functions can be stored in data structures
// ================================================
/*
Functions can be stored in data structures like arrays or objects.
This allows you to group related functions together or dynamically choose which function to call.
*/

// An array containing functions
const operations = [
  // Addition function
  function (a, b) {
    return a + b;
  },
  // Subtraction function
  function (a, b) {
    return a - b;
  },
];

// Use the functions stored in the array
console.log(operations[0](5, 3)); // Output: 8 (addition)
console.log(operations[1](5, 3)); // Output: 2 (subtraction)

// ================================================
// 5. Functions can have properties and methods
// ================================================
/*
In JavaScript, functions are objects. This means they can have properties and methods, just like any other object.
*/

// A function with a property
function greet() {
  console.log("Hello, world!");
}

// Adding a property to the function
greet.language = "English";

// Accessing the property
console.log(greet.language); // Output: English

// ================================================
// Higher-Order Function Example
// ================================================
/*
Higher-order functions are functions that take other functions as arguments or return them as results.
They are a key feature of functional programming.
*/

// A higher-order function that takes an array and a function as arguments
function mapArray(arr, fn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    // Apply the function to each element of the array
    result.push(fn(arr[i]));
  }
  return result;
}

// An array of numbers
const numbers = [1, 2, 3, 4];

// A function to double a number
const double = function (x) {
  return x * 2;
};

// Use the higher-order function to double each number in the array
const doubled = mapArray(numbers, double);

console.log(doubled); // Output: [2, 4, 6, 8]

// ================================================
// Closure Example
// ================================================
/*
A closure is a function that "remembers" the environment in which it was created.
This allows the function to access variables from its outer scope even after the outer function has finished executing.
*/

// A function that returns another function (closure)
function createCounter() {
  let count = 0; // `count` is encapsulated within the closure

  // Return a function that increments and returns `count`
  return function () {
    count++;
    return count;
  };
}

// Create a counter function
const counter = createCounter();

// Use the counter function
console.log(counter()); // Output: 1
console.log(counter()); // Output: 2
console.log(counter()); // Output: 3

// ================================================
// Callback Example (Asynchronous)
// ================================================
/*
Callbacks are functions passed as arguments to other functions and are executed later, often after an asynchronous operation completes.
They are commonly used in event handling, timers, and AJAX requests.
*/

// Simulate an asynchronous operation with a callback
function fetchData(callback) {
  setTimeout(() => {
    const data = "Some data from the server";
    callback(data); // Call the callback with the data
  }, 1000);
}

// A callback function to handle the data
function handleData(data) {
  console.log("Received data:", data);
}

// Use the asynchronous function with the callback
fetchData(handleData); // Output after 1 second: Received data: Some data from the server

// ================================================
// Functional Programming Example (Pure Function)
// ================================================
/*
A pure function is a function that:
1. Always produces the same output for the same input.
2. Has no side effects (does not modify external state).
Pure functions are a key concept in functional programming.
*/

// A pure function that adds two numbers
function add(a, b) {
  return a + b;
}

// Using the pure function
console.log(add(3, 5)); // Output: 8

// ================================================
// Event Handling Example (First-Class Functions)
// ================================================
/*
Event handling in JavaScript relies heavily on first-class functions.
You can pass functions as event listeners to handle user interactions.
*/

// Simulate an event listener
document.addEventListener("click", function () {
  console.log("Button clicked!");
});

// ================================================
// Summary
// ================================================
/*
First-class functions are a fundamental feature of JavaScript that enable:
1. Higher-order functions,
2. Closures,
3. Functional programming,
4. Callbacks and event handling.

This flexibility makes JavaScript a versatile language for both simple and complex applications.
*/
