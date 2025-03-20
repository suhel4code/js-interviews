// ================================================
// Interview Questions on IIFE (Immediately Invoked Function Expression)
// ================================================

// ================================================
// 1. What is an IIFE in JavaScript?
// ================================================
/*
An IIFE (Immediately Invoked Function Expression) is a JavaScript function that is defined and executed immediately after its creation.
It is typically used to create a local scope and avoid polluting the global namespace.
*/

// Syntax:
(function () {
  console.log("This is an IIFE!");
})();

// ================================================
// 2. Why would you use an IIFE?
// ================================================
/*
IIFEs are used for:
1. Encapsulation: To create a private scope and avoid polluting the global namespace.
2. Immediate Execution: To execute code as soon as it is defined.
3. Module Pattern: To create modules with private and public members.
4. Avoiding Variable Conflicts: To prevent naming collisions in the global scope.
*/

// Example:
(function () {
  const privateVar = "I am private";
  console.log(privateVar); // Output: I am private
})();

// ================================================
// 3. How does an IIFE create a private scope?
// ================================================
/*
An IIFE creates a new function scope. Variables and functions declared inside the IIFE are not accessible outside of it.
This helps in encapsulating code and keeping variables private.
*/

// Example:
(function () {
  const privateVar = "I am private";
  console.log(privateVar); // Output: I am private
})();

// console.log(privateVar); // Error: privateVar is not defined

// ================================================
// 4. Can you pass arguments to an IIFE?
// ================================================
/*
Yes, you can pass arguments to an IIFE. The arguments are passed when the function is invoked.
*/

// Example:
(function (name) {
  console.log(`Hello, ${name}!`); // Output: Hello, Alice!
})("Alice");

// ================================================
// 5. What is the difference between a normal function and an IIFE?
// ================================================
/*
- A normal function is defined and must be explicitly called to execute.
- An IIFE is defined and executed immediately after its creation.
*/

// Example:
// Normal function
function greet() {
  console.log("Hello!");
}
greet(); // Must be called explicitly

// IIFE
(function () {
  console.log("Hello from IIFE!");
})(); // Executes immediately

// ================================================
// 6. How can you return a value from an IIFE?
// ================================================
/*
An IIFE can return a value, which can be assigned to a variable.
*/

// Example:
const result = (function (a, b) {
  return a + b;
})(5, 3);

console.log(result); // Output: 8

// ================================================
// 7. What is the purpose of wrapping an IIFE in parentheses?
// ================================================
/*
The parentheses around the function turn it into a function expression instead of a function declaration.
This allows the function to be immediately invoked.
*/

// Example:
(function () {
  console.log("IIFE!");
})();

// Without parentheses (throws an error):
// function () {
//   console.log("IIFE!");
// }(); // SyntaxError: Function statements require a function name

// ================================================
// 8. Can you use an arrow function for an IIFE?
// ================================================
/*
Yes, you can use an arrow function for an IIFE in ES6+.
*/

// Example:
(() => {
  console.log("IIFE with arrow function!");
})();

// ================================================
// 9. How does an IIFE help in avoiding global variable pollution?
// ================================================
/*
Variables declared inside an IIFE are scoped to the function and are not accessible outside of it.
This prevents them from being added to the global scope, reducing the risk of naming conflicts.
*/

// Example:
(function () {
  const localVar = "I am local";
  console.log(localVar); // Output: I am local
})();

// console.log(localVar); // Error: localVar is not defined

// ================================================
// 10. What is the module pattern, and how does it relate to IIFEs?
// ================================================
/*
The module pattern is a design pattern that uses IIFEs to create private and public members.
It allows you to encapsulate functionality and expose only the necessary parts.
*/

// Example:
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
counterModule.reset(); // Output: Counter reset!

// ================================================
// 11. What are the modern alternatives to IIFEs?
// ================================================
/*
Modern alternatives to IIFEs include:
1. Block Scope with `let` and `const`:
   {
     const message = "Hello from block scope!";
     console.log(message); // Output: Hello from block scope!
   }
   // console.log(message); // Error: message is not defined

2. ES6 Modules:
   // module.js
   export function greet() {
     console.log("Hello from module!");
   }

   // main.js
   import { greet } from "./module.js";
   greet(); // Output: Hello from module!
*/

// ================================================
// 12. Can you name a real-world use case for IIFEs?
// ================================================
/*
A common real-world use case for IIFEs is in library development.
Many JavaScript libraries (e.g., jQuery) use IIFEs to encapsulate their code and avoid polluting the global namespace.
*/

// Example:
(function (global) {
  const library = {
    version: "1.0.0",
    greet: function () {
      console.log("Hello from the library!");
    },
  };

  global.myLibrary = library; // Expose library to the global scope
})(window);

myLibrary.greet(); // Output: Hello from the library!

// ================================================
// 13. What happens if you don't use parentheses around an IIFE?
// ================================================
/*
Without parentheses, JavaScript will treat the function as a function declaration, which requires a name.
This will result in a syntax error.
*/

// Example:
// function () {
//   console.log("IIFE!");
// }(); // SyntaxError: Function statements require a function name

// ================================================
// 14. Can you use an IIFE in an ES6 module?
// ================================================
/*
While you can use an IIFE in an ES6 module, it is generally unnecessary because ES6 modules already provide their own scope.
Each module has its own private scope, so IIFEs are redundant in this context.
*/

// ================================================
// 15. How does an IIFE help in minification?
// ================================================
/*
IIFEs can help in minification by allowing variable names to be shortened within the local scope.
Since variables inside an IIFE are not accessible outside, minifiers can safely rename them without affecting other parts of the code.
*/

// Example:
(function () {
  const longVariableName = "Hello";
  console.log(longVariableName); // Output: Hello
})();

// Minified version:
// (function(){const a="Hello";console.log(a);})();

// ================================================
// Conclusion
// ================================================
/*
IIFEs are a powerful JavaScript pattern for creating local scopes and avoiding global pollution.
While they were widely used in the past, modern JavaScript features like block-scoped variables and ES6 modules have reduced their necessity.
However, understanding IIFEs is still important for working with legacy code and certain design patterns.
*/
