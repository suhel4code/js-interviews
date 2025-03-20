// var - functional scopre
// let and const - block Scope

// 1
{
  let a;
  const b = 3;
}

console.log(b); // not accessible

// 2
{
  var a = 4;
}
console.log(a); // no error

// 3
// variable shadowing
function cal() {
  let a = "hi";

  if (true) {
    let a = "Hello";
    console.log(a);
  }

  console.log(a);
}

cal();

// 4 redclare. shadowing only happens within scope  this is not allowed
// variable shadowing
function cal() {
  var a = "hi";

  if (true) {
    var a = "Hello";
    console.log(a);
  }

  console.log(a);
}

cal();

// variable shadowing - not allowed redclaring variable
function cal() {
  let a = "hi";

  if (true) {
    var a = "Hello";
    console.log(a);
  }

  console.log(a);
}

cal();

// Fine with var // variable shadowing
function cal() {
  var a = "hi";
  var a = "bye";

  console.log(a);
}

cal();

// Not allowed with let
function cal() {
  let a = "hi";
  let a = "bye";

  console.log(a);
}

cal();

// It is allowed
// variable shadowing
function cal() {
  var a = "hi";

  if (true) {
    let a = "bye";
    console.log(a);
  }

  console.log(a);
}

cal();

//
/**
 * Variable Shadowing in JavaScript
 * Shadowing occurs when a variable in an inner scope has the same name as a variable in an outer scope.
 * The inner variable temporarily hides the outer variable within its scope.
 */

// Example 1: Function Scope Shadowing
let x = 10; // Global variable

function myFunction() {
  let x = 5; // Local variable (shadows the global 'x')
  console.log("Inside function:", x); // Outputs: 5
}

myFunction();
console.log("Outside function:", x); // Outputs: 10 (Global 'x' remains unchanged)

// Example 2: Block Scope Shadowing
let y = 10;

if (true) {
  let y = 20; // Shadows the outer 'y' inside this block
  console.log("Inside block:", y); // Outputs: 20
}

console.log("Outside block:", y); // Outputs: 10 (Outer 'y' is unaffected)

// Example 3: Shadowing in Loops
let z = 100;

for (let z = 1; z <= 3; z++) {
  console.log("Inside loop:", z); // Outputs: 1, 2, 3 (Loop variable shadows outer 'z')
}

console.log("Outside loop:", z); // Outputs: 100 (Outer 'z' is unchanged)

// Example 4: Shadowing with 'var' (Hoisting Issue)
var a = 50;

if (true) {
  var a = 30; // Shadows 'a', but 'var' has function scope, modifying the outer variable
  console.log("Inside block with var:", a); // Outputs: 30
}

console.log("Outside block with var:", a); // Outputs: 30 (Oops! The outer 'a' was changed)

/**
 * Avoiding Shadowing Issues:
 * 1. Use 'let' and 'const' instead of 'var' to maintain proper block scope.
 * 2. Use distinct variable names to avoid confusion.
 * 3. Declare variables in the smallest necessary scope.
 */

console.log("\nBest Practices to Avoid Shadowing:");
const globalVar = "I am global";

function shadowSafeFunction() {
  const localVar = "I am local"; // No shadowing, different variable name
  console.log(localVar);
}

shadowSafeFunction();
console.log(globalVar);

// Redeclartion not allowed using let and const and using var is allowed

// ==========================
// Variable Hoisting in JavaScript
// ==========================

// ==========================
// 1. Hoisting with `var`
// ==========================

console.log(a); // Outputs: undefined (Hoisted, but not assigned)
var a = 10;
console.log(a); // Outputs: 10

// Internally, JavaScript interprets this as:
// var a;         // Declaration is hoisted
// console.log(a); // undefined
// a = 10;        // Assignment happens later

// ==========================
// 2. Hoisting with `let` and `const`
// ==========================

// Uncommenting the following lines will cause ReferenceError due to Temporal Dead Zone (TDZ)

// console.log(b); // ❌ ReferenceError: Cannot access 'b' before initialization
let b = 20;
console.log(b); // ✅ Outputs: 20

// console.log(c); // ❌ ReferenceError: Cannot access 'c' before initialization
const c = 30;
console.log(c); // ✅ Outputs: 30

// ==========================
// 3. Function Hoisting
// ==========================

// ✅ Function declarations are fully hoisted (safe to call before definition)
sayHello(); // Outputs: "Hello, world!"

function sayHello() {
  console.log("Hello, world!");
}

// ❌ Function expressions are NOT hoisted properly
// hello(); // ❌ TypeError: hello is not a function

var hello = function () {
  console.log("Hi!");
};

// Same behavior applies to `let` and `const`
// greet(); // ❌ ReferenceError: Cannot access 'greet' before initialization
let greet = function () {
  console.log("Hi, there!");
};

// ==========================
// 4. Summary of Hoisting Behavior
// ==========================

/*
| Declaration          | Hoisted? | Initialized? | Usable before declaration? |
|----------------------|---------|--------------|----------------------------|
| var                 | ✅ Yes  | 🚫 No (undefined) | ⚠️ Allowed but risky (undefined) |
| let                 | ✅ Yes  | 🚫 No (TDZ error) | ❌ ReferenceError |
| const               | ✅ Yes  | 🚫 No (TDZ error) | ❌ ReferenceError |
| Function Declaration | ✅ Yes  | ✅ Yes  | ✅ Safe to call before declaration |
| Function Expression  | ✅ Only variable | 🚫 No | ❌ TypeError |
*/

// ==========================
// 5. Best Practices to Avoid Hoisting Issues
// ==========================

// ✅ Always declare variables at the top of their scope
// ✅ Use `let` and `const` instead of `var`
// ✅ Prefer function expressions (`const func = () => {}`) to avoid hoisting confusion

// undefined
function cal() {
  console.log(a);

  var a = 10;
}

cal();

// ===================================================
// JavaScript Interview Questions: var, let, and const
// ===================================================

// ===================================
// 1. What are the differences between var, let, and const?
// ===================================

/*
| Feature           | var            | let            | const          |
|------------------|---------------|---------------|--------------|
| Scope           | Function-scoped | Block-scoped  | Block-scoped |
| Hoisting        | Hoisted (initialized as undefined) | Hoisted (TDZ error) | Hoisted (TDZ error) |
| Re-declaration  | ✅ Allowed | ❌ Not allowed | ❌ Not allowed |
| Re-assignment   | ✅ Allowed | ✅ Allowed | ❌ Not allowed |
| Best Use Case   | Avoid using  | When value changes | When value remains constant |
*/

// ===================================
// 2. Variable Hoisting
// ===================================

// Example with `var`
console.log(a); // ✅ undefined (Hoisted but uninitialized)
var a = 10;
console.log(a); // ✅ 10

// Example with `let` and `const`
// console.log(b); // ❌ ReferenceError: Cannot access 'b' before initialization
let b = 20;
console.log(b); // ✅ 20

// console.log(c); // ❌ ReferenceError: Cannot access 'c' before initialization
const c = 30;
console.log(c); // ✅ 30

// ===================================
// 3. Can you re-declare variables?
// ===================================

var x = 10;
var x = 20; // ✅ No error
console.log(x); // ✅ 20

// let y = 30;
// let y = 40; // ❌ SyntaxError: Identifier 'y' has already been declared

// const z = 50;
// const z = 60; // ❌ SyntaxError: Identifier 'z' has already been declared

// ===================================
// 4. Can you reassign a `const` variable?
// ===================================

// const PI = 3.14;
// PI = 3.1416; // ❌ TypeError: Assignment to constant variable.

// However, objects declared with `const` can be modified:
const person = { name: "John" };
person.name = "Doe"; // ✅ Allowed (modifying properties)
console.log(person.name); // "Doe"

// person = { age: 30 }; // ❌ TypeError: Assignment to constant variable.

// ===================================
// 5. What is the Temporal Dead Zone (TDZ)?
// ===================================

// console.log(td); // ❌ ReferenceError (TDZ)
let td = 5;
console.log(td); // ✅ 5

// ===================================
// 6. Scope differences between var, let, and const
// ===================================

function testVar() {
  if (true) {
    var a = 10;
  }
  console.log(a); // ✅ 10 (Function-scoped)
}

function testLet() {
  if (true) {
    let b = 20;
  }
  // console.log(b); // ❌ ReferenceError (Block-scoped)
}

testVar();
testLet();

// ===================================
// 7. Behavior in Loops: var vs. let
// ===================================

// Using `var` in loops
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var i:", i), 1000);
}
// Output: "var i: 3", "var i: 3", "var i: 3"

// Using `let` in loops
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let j:", j), 1000);
}
// Output: "let j: 0", "let j: 1", "let j: 2"

// ===================================
// 8. Can you declare a `const` variable without assigning a value?
// ===================================

// const newVar; // ❌ SyntaxError: Missing initializer in const declaration

// ===================================
// 9. Are `let` and `const` attached to the global `window` object?
// ===================================

var globalVar = 10;
console.log(window.globalVar); // ✅ 10

let globalLet = 20;
console.log(window.globalLet); // ❌ undefined

const globalConst = 30;
console.log(window.globalConst); // ❌ undefined

// ===================================
// 10. What happens if you declare a variable without var, let, or const?
// ===================================

function test() {
  globalImplicit = 100; // ❌ Implicit global variable (Bad practice)
}
test();
console.log(globalImplicit); // ✅ 100

// ===================================
// 11. Can you modify an object declared with `const`?
// ===================================

const user = { name: "Alice" };
user.name = "Bob"; // ✅ Allowed (modifying properties)
console.log(user.name); // "Bob"

// user = { name: "Charlie" }; // ❌ TypeError: Assignment to constant variable.

// ===================================
// 12. Why prefer `let` and `const` over `var`?
// ===================================

/*
✅ Avoids accidental global variables (`var` attaches to `window`).
✅ Block-scoping prevents unexpected behavior in loops.
✅ `let` & `const` throw errors in the TDZ, making code more predictable.
✅ `const` ensures immutability, improving safety.
*/

console.log("Use `let` and `const` for cleaner, safer JavaScript!");

// ===================================================
// JavaScript: Behavior of var vs. let in Loops
// ===================================================

// ===================================
// 1. Using `var` inside a loop
// ===================================

console.log("Example with var:");

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var i:", i), 1000);
}

/*
Expected Output:
var i: 3
var i: 3
var i: 3

Explanation:
- `var i` is function-scoped, so all iterations share the same `i` variable.
- The loop runs quickly and completes before `setTimeout` executes.
- When `setTimeout` runs (after 1 second), `i` is already `3`, so all logs show `3`.
*/

// ===================================
// 2. Using `let` inside a loop
// ===================================

console.log("Example with let:");

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let j:", j), 1000);
}

/*
Expected Output:
let j: 0
let j: 1
let j: 2

Explanation:
- `let j` is block-scoped, meaning each iteration gets a new `j` variable.
- When `setTimeout` runs, it captures the correct value of `j` for that iteration.
- The output is as expected: `0, 1, 2`.
*/

// ===================================
// 3. Fixing `var` with an IIFE
// ===================================

console.log("Fixing var using IIFE:");

for (var i = 0; i < 3; i++) {
  (function (i) {
    // IIFE (Immediately Invoked Function Expression)
    setTimeout(() => console.log("IIFE var i:", i), 1000);
  })(i);
}

/*
Expected Output:
IIFE var i: 0
IIFE var i: 1
IIFE var i: 2

Explanation:
- The IIFE creates a new function scope for each loop iteration.
- Each function call gets its own `i`, preserving the correct values.
*/

// ===================================
// 4. Fixing `var` by using `let` inside `setTimeout`
// ===================================

console.log("Fixing var using let inside setTimeout:");

for (var i = 0; i < 3; i++) {
  let j = i; // Create a block-scoped copy of `i`
  setTimeout(() => console.log("Fixed var i:", j), 1000);
}

/*
Expected Output:
Fixed var i: 0
Fixed var i: 1
Fixed var i: 2

Explanation:
- `let j = i;` creates a new block-scoped variable inside each loop iteration.
- `setTimeout` captures the correct value of `j` for each iteration.
*/

// ===================================
// Summary of Best Practices
// ===================================

/*
✅ Use `let` in loops to ensure block-scoping.
✅ If you must use `var`, use an IIFE to capture the correct values.
✅ Another fix for `var` is to create a block-scoped copy inside the loop.
❌ Avoid using `var` in loops with asynchronous functions like `setTimeout`.
*/

console.log("Best Practice: Always use `let` in loops!");

// ===================================
// End of file
// ===================================


// ==================================================
// JavaScript Interview Questions on var, let, and const
// ==================================================

// 1. Hoisting with var and let
console.log("Q1:");
console.log(a); // undefined (hoisted)
var a = 10;

try {
    console.log(b); // ReferenceError
    let b = 20;
} catch (e) {
    console.log("Error:", e.message);
}

// 2. var inside a function
console.log("\nQ2:");
function testVar() {
    console.log(x); // undefined (hoisted)
    var x = 5;
}
testVar();

// 3. Block scope with var and let
console.log("\nQ3:");
{
    var x = 10;
    let y = 20;
}
console.log(x); // 10 (var is not block-scoped)
try {
    console.log(y); // ReferenceError (y is block-scoped)
} catch (e) {
    console.log("Error:", e.message);
}

// 4. Redeclaration of variables
console.log("\nQ4:");
var c = 5;
var c = 10; // Allowed
console.log(c); // 10

try {
    let d = 5;
    let d = 10; // Not allowed
    console.log(d);
} catch (e) {
    console.log("Error:", e.message);
}

// 5. const cannot be reassigned
console.log("\nQ5:");
try {
    const PI = 3.14;
    PI = 3.1416; // Error
} catch (e) {
    console.log("Error:", e.message);
}

// 6. const with objects
console.log("\nQ6:");
const obj = { name: "Alice" };
obj.name = "Bob"; // Allowed (modifying properties)
console.log(obj.name); // Bob

try {
    obj = { age: 25 }; // Error (cannot reassign the entire object)
} catch (e) {
    console.log("Error:", e.message);
}

// 7. Looping with var vs let
console.log("\nQ7:");
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var i:", i), 1000);
}

for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let j:", j), 1000);
}

// 8. Global variables with var, let, and const
console.log("\nQ8:");
var globalVar = 10;
let globalLet = 20;
const globalConst = 30;

console.log("window.globalVar:", typeof window !== "undefined" ? window.globalVar : "N/A"); // 10
console.log("window.globalLet:", typeof window !== "undefined" ? window.globalLet : "N/A"); // undefined
console.log("window.globalConst:", typeof window !== "undefined" ? window.globalConst : "N/A"); // undefined

// 9. Temporal Dead Zone (TDZ)
console.log("\nQ9:");
try {
    console.log(tempVar);
    let tempVar = 5; // Error: Cannot access 'tempVar' before initialization
} catch (e) {
    console.log("Error:", e.message);
}

// 10. Function scope vs Block scope
console.log("\nQ10:");
function example() {
    if (true) {
        var functionScoped = 10;
        let blockScoped = 20;
    }
    console.log(functionScoped); // 10 (var is function-scoped)
    try {
        console.log(blockScoped); // Error
    } catch (e) {
        console.log("Error:", e.message);
    }
}
example();

// 11. const declaration without assignment
console.log("\nQ11:");
try {
    const x;
    console.log(x);
} catch (e) {
    console.log("Error:", e.message); // Error: Missing initializer in const declaration
}

// 12. Function inside a loop
console.log("\nQ12:");
for (var i = 0; i < 3; i++) {
    function testFunc() {
        console.log("var in function:", i);
    }
}
testFunc(); // 3

// 13. let and var in nested scopes
console.log("\nQ13:");
var nestedVar = 5;
{
    let nestedVar = 10;
    console.log("Inner scope:", nestedVar); // 10
}
console.log("Outer scope:", nestedVar); // 5

// 14. let before declaration
console.log("\nQ14:");
try {
    console.log(beforeDecl);
    let beforeDecl = 10;
} catch (e) {
    console.log("Error:", e.message);
}

// 15. Comparing var and let in for loops
console.log("\nQ15:");
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var in loop:", i), 1000);
}

for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log("let in loop:", i), 1000);
}

// ==================================================
// End of file
// ==================================================


// ==================================================
// JavaScript Advanced Challenges: var, let, and const
// ==================================================

// 1. Hoisting & Temporal Dead Zone
console.log("Q1:");
console.log(foo); // undefined (var is hoisted)
var foo = "Hello";

try {
    console.log(bar); // ReferenceError (let is in TDZ)
    let bar = "World";
} catch (error) {
    console.log("Error:", error.message);
}

// 2. Closure & Loops (var vs let)
console.log("\nQ2:");
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var loop:", i), 1000);
}

for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let loop:", j), 1000);
}

// 3. Function Scope vs Block Scope
console.log("\nQ3:");
function test() {
    if (true) {
        var a = 10;
        let b = 20;
    }
    console.log(a); // 10 (var is function-scoped)
    try {
        console.log(b); // ReferenceError (let is block-scoped)
    } catch (error) {
        console.log("Error:", error.message);
    }
}
test();

// 4. Variable Shadowing
console.log("\nQ4:");
let x = 5;
function outer() {
    let x = 10;
    function inner() {
        console.log("Inner:", x); // 10 (shadowed)
    }
    inner();
}
outer();
console.log("Global:", x); // 5

// 5. const with Arrays & Objects
console.log("\nQ5:");
const numbers = [1, 2, 3];
numbers.push(4);
console.log("Modified array:", numbers);

try {
    numbers = [10, 20, 30]; // Error
} catch (error) {
    console.log("Error:", error.message);
}

// 6. Trickiest TDZ Example
console.log("\nQ6:");
{
    console.log(myVar); // undefined (hoisted var)
    var myVar = 100;

    try {
        console.log(myLet); // Error
        let myLet = 200;
    } catch (error) {
        console.log("Error:", error.message);
    }
}

// 7. `this` inside a Loop (Fix using Arrow Function)
console.log("\nQ7:");
var obj = {
    value: 42,
    log: function () {
        setTimeout(function () {
            console.log("Without arrow:", this.value); // undefined (wrong this)
        }, 1000);
        setTimeout(() => {
            console.log("With arrow:", this.value); // 42 (correct)
        }, 1000);
    }
};
obj.log();

// 8. Function Hoisting vs Variable Hoisting
console.log("\nQ8:");
console.log(fooFunc()); // "Hello, world!"

function fooFunc() {
    return "Hello, world!";
}

try {
    console.log(barFunc()); // TypeError
} catch (error) {
    console.log("Error:", error.message);
}

var barFunc = function () {
    return "Goodbye, world!";
};

// 9. Bonus Challenge - Predict the Output
console.log("\nQ9:");
console.log(a); // undefined
var a = 10;

try {
    console.log(b); // ReferenceError
    let b = 20;
} catch (error) {
    console.log("Error:", error.message);
}

function fooBonus() {
    console.log(c); // undefined
    var c = 30;

    try {
        console.log(d); // ReferenceError
        let d = 40;
    } catch (error) {
        console.log("Error:", error.message);
    }
}
fooBonus();

// ==================================================
// End of File
// ==================================================

