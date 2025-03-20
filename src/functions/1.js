/**
 * JavaScript Functions: Declaration vs Expression
 * ----------------------------------------------
 * This file demonstrates:
 * 1. Function Declarations
 * 2. Function Expressions (Named & Anonymous)
 * 3. Arrow Functions (ES6)
 * 4. Hoisting Behavior
 */

// ===============================
// 1️⃣ Function Declaration (Hoisted)
// ===============================
// Function declarations are hoisted, meaning they can be used before their definition.

console.log(greetDeclaration("Alice")); // ✅ Works fine because of hoisting

function greetDeclaration(name) {
  return `Hello, ${name}!`;
}

console.log(greetDeclaration("Bob")); // Output: "Hello, Bob!"

// ===============================
// 2️⃣ Function Expression (Not Hoisted)
// ===============================
// Function expressions are NOT hoisted, so they cannot be used before declaration.

// console.log(greetExpression("Bob")); ❌ ERROR: Cannot access before initialization

const greetExpression = function (name) {
  return `Hello, ${name}!`;
};

console.log(greetExpression("Charlie")); // Output: "Hello, Charlie!"

// ===============================
// 3️⃣ Anonymous Function Expression
// ===============================
// These functions have no name and are assigned to variables.

const anonymousFunc = function () {
  return "I'm an anonymous function!";
};

console.log(anonymousFunc()); // Output: "I'm an anonymous function!"

// ===============================
// 4️⃣ Named Function Expression
// ===============================
// The function itself has a name, which can help with debugging.

const namedFunc = function namedExample() {
  return "I'm a named function expression!";
};

console.log(namedFunc()); // Output: "I'm a named function expression!"

// Note: namedExample is not available globally!
// console.log(namedExample()); ❌ ERROR: namedExample is not defined outside

// ===============================
// 5️⃣ Arrow Function (ES6)
// ===============================
// Arrow functions provide a shorter syntax but do NOT have their own `this`.

const greetArrow = (name) => `Hello, ${name}!`;

console.log(greetArrow("David")); // Output: "Hello, David!"

// ===============================
// 6️⃣ Hoisting Demonstration
// ===============================

// ✅ Function Declaration is hoisted, so it works before definition.
console.log(hoistedFunction());

function hoistedFunction() {
  return "I'm hoisted!";
}

// ❌ Function Expression is NOT hoisted, so calling it before declaration will cause an error.
// console.log(notHoistedFunction()); // ERROR: Cannot access before initialization

const notHoistedFunction = function () {
  return "I'm NOT hoisted!";
};

console.log(notHoistedFunction()); // Output: "I'm NOT hoisted!"

// ===============================
// 7️⃣ `this` Behavior in Functions
// ===============================

// Traditional function (`this` depends on how it's called)
const obj = {
  value: 42,
  traditionalFunction: function () {
    console.log(this.value); // ✅ Works as expected
  },
};

obj.traditionalFunction(); // Output: 42

// Arrow function (`this` is inherited from surrounding scope)
const objArrow = {
  value: 42,
  arrowFunction: () => {
    console.log(this.value); // ❌ Undefined (because arrow functions don't bind `this`)
  },
};

objArrow.arrowFunction(); // Output: undefined

// ===============================
// 8️⃣ Function Constructor (Less Common)
// ===============================
// Functions can also be created using the Function constructor.

const sumFunction = new Function("a", "b", "return a + b");

console.log(sumFunction(5, 10)); // Output: 15

// ===============================
// 9️⃣ IIFE (Immediately Invoked Function Expression)
// ===============================
// IIFE runs immediately after definition.

(function () {
  console.log("I'm an IIFE! (Runs immediately)");
})();

// Arrow Function version of IIFE
(() => {
  console.log("I'm an arrow function IIFE!");
})();

// ===============================
// 🔟 Summary
// ===============================
/**
 * - Function Declarations are hoisted.
 * - Function Expressions are NOT hoisted.
 * - Arrow functions are shorter but don’t have their own `this`.
 * - Named function expressions help with debugging.
 * - IIFE executes immediately after definition.
 */
