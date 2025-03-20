/**
 * 🔥 JavaScript: Arrow Function vs Normal Function
 * ------------------------------------------------
 * This file contains:
 * ✅ Syntax Differences
 * ✅ `this` Binding Behavior
 * ✅ `arguments` Object
 * ✅ Usage as Methods
 * ✅ Constructor Function Differences
 * ✅ Implicit Return in Arrow Functions
 * ✅ Performance Considerations
 */

// =====================================================
// 1️⃣ Syntax Difference
// =====================================================

// 🔹 Normal Function
function greet(name) {
  return "Hello, " + name;
}
console.log(greet("Alice")); // ✅ "Hello, Alice"

// 🔹 Arrow Function (Shorter Syntax)
const greetArrow = (name) => "Hello, " + name;
console.log(greetArrow("Bob")); // ✅ "Hello, Bob"

// =====================================================
// 2️⃣ `this` Binding Difference
// =====================================================

const obj = {
  name: "Alice",
  normalFunc: function () {
    console.log("Normal Function:", this.name);
  },
  arrowFunc: () => {
    console.log("Arrow Function:", this.name);
  },
};

obj.normalFunc(); // ✅ "Normal Function: Alice"
obj.arrowFunc(); // ❌ "Arrow Function: undefined" (Arrow function does NOT bind `this`)

// =====================================================
// 3️⃣ `arguments` Object
// =====================================================

// ✅ Normal function has `arguments`
function normalFunc() {
  console.log(arguments); // ✅ Arguments available
}
normalFunc(1, 2, 3); // [1, 2, 3]

// ❌ Arrow function does NOT have `arguments`
const arrowFunc = () => {
  console.log(arguments); // ❌ ERROR: arguments is not defined
};
// arrowFunc(1, 2, 3); // Uncaught ReferenceError

// ✅ Workaround using rest parameters (`...args`)
const arrowWithArgs = (...args) => {
  console.log(args);
};
arrowWithArgs(1, 2, 3); // ✅ [1, 2, 3]

// =====================================================
// 4️⃣ Arrow Functions in Object Methods
// =====================================================

const person = {
  name: "Bob",
  sayHello: function () {
    console.log("Hello, " + this.name);
  },
  sayHelloArrow: () => {
    console.log("Hello, " + this.name);
  },
};

person.sayHello(); // ✅ "Hello, Bob"
person.sayHelloArrow(); // ❌ "Hello, undefined"

// ✅ Correct Way to Use Arrow Functions Inside Objects:
const person2 = {
  name: "Charlie",
  sayHello() {
    setTimeout(() => {
      console.log("Hello, " + this.name); // ✅ Works correctly
    }, 1000);
  },
};

person2.sayHello(); // ✅ "Hello, Charlie"

// =====================================================
// 5️⃣ Constructor Function Differences
// =====================================================

// ✅ Normal function works as a constructor
function Person(name) {
  this.name = name;
}
const user1 = new Person("Alice");
console.log(user1.name); // ✅ Alice

// ❌ Arrow functions cannot be constructors
const PersonArrow = (name) => {
  this.name = name;
};
// const user2 = new PersonArrow("Bob"); // ❌ ERROR: Arrow functions cannot be constructors

// =====================================================
// 6️⃣ Implicit `return` in Arrow Functions
// =====================================================

// ✅ Normal function requires `return`
function add(a, b) {
  return a + b;
}
console.log(add(5, 3)); // ✅ 8

// ✅ Arrow function (Implicit `return`)
const addArrow = (a, b) => a + b;
console.log(addArrow(5, 3)); // ✅ 8

// ✅ Multiple statements require `{}` and explicit `return`
const addWithArrow = (a, b) => {
  const sum = a + b;
  return sum;
};
console.log(addWithArrow(5, 3)); // ✅ 8

// =====================================================
// 7️⃣ Performance Considerations
// =====================================================

// ✅ Arrow functions are slightly faster for small operations

// Performance Test
console.time("Normal Function");
for (let i = 0; i < 1000000; i++) {
  (function (x) {
    return x * 2;
  })(i);
}
console.timeEnd("Normal Function");

console.time("Arrow Function");
for (let i = 0; i < 1000000; i++) {
  ((x) => x * 2)(i);
}
console.timeEnd("Arrow Function");

// =====================================================
// 8️⃣ Summary of Key Differences
// =====================================================
console.log(`
| Feature            | Normal Function          | Arrow Function         |
|--------------------|-------------------------|------------------------|
| Syntax            | function myFunc() {}     | const myFunc = () => {} |
| this Binding      | Depends on caller        | Inherits from parent scope |
| arguments Object  | ✅ Available             | ❌ Not available (use ...args) |
| Object Methods    | ✅ Works well            | ❌ 'this' issues in object methods |
| Constructor (new) | ✅ Can be used           | ❌ Cannot be used as constructor |
| Implicit Return   | ❌ Requires return       | ✅ Can omit return |
| Performance       | Slightly slower          | Slightly faster |
| Best Use Cases   | Object methods, constructors | Callbacks, simple functions |
`);

// =====================================================
// ✅ Conclusion: When to Use Arrow vs Normal Functions
// =====================================================

console.log(`
✔ Use Arrow Functions when:
  - You need short, simple functions (e.g., map, filter, reduce).
  - You want to inherit 'this' from the parent scope.
  - You need implicit return for short expressions.

✔ Use Normal Functions when:
  - You need object methods that rely on 'this'.
  - You need a function constructor (new keyword).
  - You need to access the 'arguments' object.
`);

console.log("✅ Arrow vs Normal Function Examples Complete!");
