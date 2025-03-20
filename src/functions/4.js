/**
 * JavaScript IIFE (Immediately Invoked Function Expression) Interview Questions & Examples
 * ----------------------------------------------------------------------------------------
 * This file contains:
 * 1. Basic IIFE Examples
 * 2. Use Cases of IIFE
 * 3. Advanced IIFE Scenarios
 * 4. IIFE with Closures, Loops, and Async/Await
 * 5. Common IIFE Interview Questions
 */

// ===================================
// 1️⃣ What is an IIFE in JavaScript?
// ===================================
// An IIFE is a function that runs immediately after its definition.

(function () {
  console.log("I'm an IIFE! 🚀");
})();

// Arrow function IIFE
(() => {
  console.log("I'm an arrow function IIFE!");
})();

// Function Constructor IIFE
new Function('console.log("Function constructor IIFE!")')();

// ===================================
// 2️⃣ Why do we use IIFE?
// ===================================
// ✅ To avoid polluting the global scope
// ✅ To create private variables
// ✅ To execute code immediately

(function () {
  var secret = "This is a private variable";
  console.log(secret); // ✅ Accessible inside IIFE
})();

// console.log(secret); ❌ ERROR: secret is not defined outside

// ===================================
// 3️⃣ Different Ways to Write an IIFE
// ===================================

// Standard IIFE
(function () {
  console.log("Standard IIFE");
})();

// IIFE with function expression
const iifeFunc = (function () {
  return "IIFE returning a value!";
})();
console.log(iifeFunc);

// ===================================
// 4️⃣ IIFE with Arguments
// ===================================

(function (name) {
  console.log("Hello, " + name + "!");
})("Alice");

// ===================================
// 5️⃣ Hoisting Behavior in IIFE
// ===================================
// Function declarations are hoisted, but IIFE runs immediately.

console.log(hoistedFunction()); // ✅ Works fine due to hoisting

function hoistedFunction() {
  return "I'm hoisted!";
}

// console.log(notHoistedFunction()); ❌ ERROR: Cannot access before initialization
const notHoistedFunction = function () {
  return "I'm NOT hoisted!";
};
console.log(notHoistedFunction()); // ✅ Works fine after declaration

// ===================================
// 6️⃣ Nested IIFE
// ===================================
(function outer() {
  console.log("Outer IIFE");
  (function inner() {
    console.log("Inner IIFE");
  })();
})();

// ===================================
// 7️⃣ IIFE with Closures (Private Variables)
// ===================================
const counter = (function () {
  let count = 0; // Private variable

  return {
    increment: function () {
      count++;
      console.log(count);
    },
    decrement: function () {
      count--;
      console.log(count);
    },
  };
})();

counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1
// console.log(count); ❌ ERROR: count is private

// ===================================
// 8️⃣ IIFE vs Regular Functions
// ===================================
/**
 * Regular function needs to be called manually.
 * IIFE runs automatically.
 */

function regularFunction() {
  console.log("I'm a regular function!");
}
regularFunction(); // ✅ Requires explicit call

(function () {
  console.log("I'm an IIFE! Running automatically!");
})(); // ✅ Runs immediately

// ===================================
// 9️⃣ IIFE and `this` Behavior
// ===================================

const obj = {
  value: 42,
  traditionalFunction: function () {
    console.log(this.value); // ✅ Works as expected
  },
};
obj.traditionalFunction(); // Output: 42

const objArrow = {
  value: 42,
  arrowFunction: () => {
    console.log(this.value); // ❌ Undefined (Arrow functions don't bind `this`)
  },
};
objArrow.arrowFunction(); // Output: undefined

// ===================================
// 🔟 IIFE in Loops (Closure Issue Fix)
// ===================================
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000); // ❌ Output: 3, 3, 3 (var has function scope)
}

// ✅ Using IIFE to preserve the loop variable
for (var i = 0; i < 3; i++) {
  (function (i) {
    setTimeout(() => console.log(i), 1000); // ✅ Output: 0, 1, 2
  })(i);
}

// ✅ Using `let` instead (Block scope)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000); // ✅ Output: 0, 1, 2
}

// ===================================
// 1️⃣1️⃣ IIFE with Async/Await (Modern Use Case)
// ===================================

(async function fetchData() {
  let response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  let data = await response.json();
  console.log(data);
})();

// ===================================
// 1️⃣2️⃣ Common IIFE Interview Questions
// ===================================

// ❓ What will be the output?
var x = 10;

(function () {
  var x = 20;
  console.log(x); // ✅ Output: 20 (Local scope)
})();

console.log(x); // ✅ Output: 10 (Global scope)

// ❓ What will be the output of `typeof` with `var` and `let`?
(function () {
  var x = 1;
  let y = 2;
})();

console.log(typeof x); // ✅ "undefined" (function-scoped var)
// console.log(typeof y); ❌ ReferenceError (block-scoped let)

// ===================================
// Summary of Key IIFE Concepts
// ===================================

/**
 * - IIFE runs **immediately** after definition.
 * - Used for **private scope** and **avoiding global variables**.
 * - Supports **arguments** and **return values**.
 * - Can **fix closure issues in loops**.
 * - Supports **async/await**.
 * - Arrow function IIFE works similarly.
 */

console.log("✅ IIFE Concepts Covered!");
