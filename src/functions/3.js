// ================================================
// What is an IIFE (Immediately Invoked Function Expression)?
// ================================================
/*
An IIFE (pronounced "iffy") is a JavaScript function that is defined and executed immediately after its creation.
It is a design pattern often used to create a local scope and avoid polluting the global namespace.
*/

// ================================================
// Syntax of an IIFE
// ================================================
/*
An IIFE has the following structure:
(function () {
  // Code inside the IIFE
})();

Or with arrow functions (ES6+):
(() => {
  // Code inside the IIFE
})();
*/

// ================================================
// Why Use IIFEs?
// ================================================
/*
1. Avoid Polluting the Global Scope:
   - Variables and functions declared inside an IIFE are not accessible outside of it.
   - This helps prevent naming conflicts in the global scope.

2. Create Private Scope:
   - IIFEs create a new scope, allowing you to encapsulate code and keep variables private.

3. Immediate Execution:
   - The function is executed immediately after it is defined, making it useful for initialization tasks.

4. Module Pattern:
   - IIFEs are often used to create modules in JavaScript, where you can expose only the necessary parts of the code.
*/

// ================================================
// Examples of IIFEs
// ================================================

// Example 1: Basic IIFE
(function () {
  const message = "Hello from IIFE!";
  console.log(message); // Output: Hello from IIFE!
})();

// `message` is not accessible here
// console.log(message); // Error: message is not defined

// Example 2: IIFE with Parameters
(function (name) {
  console.log(`Hello, ${name}!`); // Output: Hello, Alice!
})("Alice");

// Example 3: IIFE with Return Value
const result = (function (a, b) {
  return a + b;
})(5, 3);

console.log(result); // Output: 8

// Example 4: IIFE for Module Pattern
const counterModule = (function () {
  let count = 0; // Private variable

  return {
    increment: function () {
      count++;
      console.log(`Count: ${count}`);
    },
    reset: function () {
      count = 0;
      console.log("Counter reset!");
    },
  };
})();

counterModule.increment(); // Output: Count: 1
counterModule.increment(); // Output: Count: 2
counterModule.reset(); // Output: Counter reset!

// Example 5: IIFE with Arrow Function (ES6+)
(() => {
  console.log("IIFE with arrow function!"); // Output: IIFE with arrow function!
})();

// ================================================
// When to Use IIFEs
// ================================================
/*
1. Avoiding Global Pollution:
   - Use IIFEs to encapsulate code and avoid adding variables or functions to the global scope.

2. Initialization Tasks:
   - Use IIFEs for one-time setup tasks that don't need to be reused.

3. Creating Modules:
   - Use IIFEs to create private variables and expose only the necessary functionality.

4. Legacy Code:
   - Before ES6 introduced block-scoped variables (`let` and `const`), IIFEs were commonly used to create local scopes.
*/

// ================================================
// Advantages of IIFEs
// ================================================
/*
1. Encapsulation:
   - Keeps variables and functions private, reducing the risk of naming conflicts.

2. Immediate Execution:
   - Useful for initialization tasks that need to run as soon as the script loads.

3. No Global Pollution:
   - Prevents polluting the global namespace, which is especially important in large applications.
*/

// ================================================
// Disadvantages of IIFEs
// ================================================
/*
1. Readability:
   - IIFEs can make code harder to read, especially for beginners.

2. Debugging:
   - Since IIFEs are anonymous, debugging can be more challenging.

3. Modern Alternatives:
   - With the introduction of ES6 modules (`import`/`export`) and block-scoped variables (`let`/`const`), IIFEs are less commonly used today.
*/

// ================================================
// Modern Alternatives to IIFEs
// ================================================

// Alternative 1: Block Scope with `let` and `const`
{
  const message = "Hello from block scope!";
  console.log(message); // Output: Hello from block scope!
}
// console.log(message); // Error: message is not defined

// Alternative 2: ES6 Modules
/*
// module.js
export function greet() {
  console.log("Hello from module!");
}

// main.js
import { greet } from "./module.js";
greet(); // Output: Hello from module!
*/

// ================================================
// Conclusion
// ================================================
/*
IIFEs are a powerful JavaScript pattern for creating local scopes and avoiding global pollution.
While they were widely used in the past, modern JavaScript features like block-scoped variables and ES6 modules have reduced their necessity.
However, understanding IIFEs is still important for working with legacy code and certain design patterns.
*/
