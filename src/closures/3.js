// =============================================
// 📌 JavaScript Module Pattern with IIFE
// =============================================

// ✅ This is an example of the Module Pattern in JavaScript
// ✅ It uses an Immediately Invoked Function Expression (IIFE)
// ✅ Private variables & functions are encapsulated inside the function scope

const myModule = (function () {
  // ✅ Private variable (not accessible outside)
  let counter = 0;

  // ✅ Private function (not accessible outside)
  function privateMethod() {
    console.log("This is a private method");
  }

  return {
    // ✅ Public method (can be accessed outside)
    publicMethod: function () {
      console.log("This is a public method");
      privateMethod(); // ✅ Can access private method inside the module
    },

    // ✅ Public method to modify private data
    incrementCounter: function () {
      counter++;
      console.log("Counter:", counter);
    },

    // ✅ Public method to retrieve private data
    getCounter: function () {
      return counter;
    },
  };
})();

// ✅ Usage of Module Pattern
myModule.publicMethod(); // ✅ Outputs: "This is a public method" + "This is a private method"
myModule.incrementCounter(); // ✅ Outputs: "Counter: 1"
console.log(myModule.getCounter()); // ✅ Outputs: 1

// ❌ This will throw an error because privateMethod is not accessible outside
// myModule.privateMethod(); // ❌ Uncaught TypeError: myModule.privateMethod is not a function

// =============================================
// 🔹 Why Use the Module Pattern?
// =============================================
/*
✅ Encapsulation: Keeps private variables and functions hidden.
✅ Prevents Global Pollution: Avoids defining variables in the global scope.
✅ Data Privacy: Private methods and variables can't be accessed directly.
✅ Maintainability & Reusability: Helps organize code into reusable modules.
*/

// =============================================
// 🔹 Alternative: Modern ES6 Modules
// =============================================
// Instead of using the Module Pattern, you can use ES6 modules (`import/export`)

// 🚀 Create a separate module file (myModule.js) like this:

/*
// myModule.js
export function publicMethod() {
  console.log("This is a public method");
}
export function anotherPublicMethod() {
  console.log("Another public method");
}
*/

// 🚀 Then, import and use it in another file (main.js):

/*
// main.js
import { publicMethod } from "./myModule.js";
publicMethod(); // ✅ Outputs: "This is a public method"
*/

// =============================================
// 🔹 Comparing Module Pattern vs. ES6 Modules
// =============================================
/*
| Feature             | Module Pattern (IIFE) | ES6 Modules |
|--------------------|----------------|------------|
| Encapsulation      | ✅ Yes (Private variables) | ❌ No (Everything exported is public) |
| Global Scope Pollution | ✅ Avoided | ✅ Avoided |
| Reusability       | ✅ Yes | ✅ Yes (Better with `import/export`) |
| Support in Browsers | ✅ Works Everywhere | ✅ Modern Browsers Only |
*/

// =============================================
// 🔹 Summary
// =============================================
/*
✔ The Module Pattern (IIFE) is useful when you need **private methods and variables**.
✔ ES6 Modules are better for **modern projects** as they allow easy file-based structuring.
✔ Use ES6 Modules if you are working in **modern environments** with `import/export`.
✔ Use the Module Pattern if you need **data encapsulation** and compatibility with older JS environments.
*/

// =============================================
// 🚀 Need More Examples? Let Me Know! 😃
// =============================================
