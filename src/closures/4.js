// =============================================
// 📌 JavaScript Closures - Interview Questions
// =============================================

// ✅ 1️⃣ What is a Closure?
// A closure is a function that retains access to its parent scope,
// even after the parent function has executed.

function outer() {
  let message = "Hello"; // Private variable

  function inner() {
    console.log(message); // Closure keeps access to 'message'
  }

  return inner;
}

const sayHello = outer();
sayHello(); // ✅ Output: "Hello"

// =============================================
// ✅ 2️⃣ How does a Closure Work Internally?
// =============================================
// Closures work because JavaScript uses "Lexical Scoping."

function createCounter() {
  let count = 0; // Private variable

  return {
    increment: function () {
      count++;
      console.log("Counter:", count);
    },
    decrement: function () {
      count--;
      console.log("Counter:", count);
    },
    getCount: function () {
      return count;
    },
  };
}

const counter = createCounter();
counter.increment(); // ✅ Counter: 1
counter.increment(); // ✅ Counter: 2
console.log(counter.getCount()); // ✅ 2
counter.decrement(); // ✅ Counter: 1

// =============================================
// ✅ 3️⃣ Common Closure Pitfall - Using 'var' in Loops
// =============================================

function count() {
  for (var i = 1; i <= 3; i++) {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  }
}

count(); // ❌ Output: 4, 4, 4 (due to 'var')

// ✅ FIX using 'let'
function countFixed() {
  for (let i = 1; i <= 3; i++) {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  }
}

countFixed(); // ✅ Output: 1, 2, 3

// ✅ FIX using an IIFE (Immediately Invoked Function Expression)
function countWithClosure() {
  for (var i = 1; i <= 3; i++) {
    (function (i) {
      setTimeout(() => {
        console.log(i);
      }, 1000);
    })(i);
  }
}

countWithClosure(); // ✅ Output: 1, 2, 3

// =============================================
// ✅ 4️⃣ Function Currying Using Closures
// =============================================

function outer(x) {
  return function inner(y) {
    return x + y;
  };
}

const add5 = outer(5);
console.log(add5(10)); // ✅ 15
console.log(add5(20)); // ✅ 25

// =============================================
// ✅ 5️⃣ Generating Unique IDs with Closures
// =============================================

function uniqueIDGenerator() {
  let id = 0;

  return function () {
    id++;
    return `ID-${id}`;
  };
}

const generateID = uniqueIDGenerator();
console.log(generateID()); // ✅ ID-1
console.log(generateID()); // ✅ ID-2
console.log(generateID()); // ✅ ID-3

// =============================================
// ✅ 6️⃣ Debugging Closure Issues in Loops
// =============================================

function createArray() {
  let arr = [];

  for (var i = 0; i < 3; i++) {
    arr.push(() => console.log(i));
  }

  return arr;
}

const arr = createArray();
arr[0](); // ❌ 3
arr[1](); // ❌ 3
arr[2](); // ❌ 3

// ✅ FIX using 'let' to create a new variable per loop iteration
function createArrayFixed() {
  let arr = [];

  for (let i = 0; i < 3; i++) {
    arr.push(() => console.log(i)); // ✅ Each function gets a new 'i'
  }

  return arr;
}

const arrFixed = createArrayFixed();
arrFixed[0](); // ✅ 0
arrFixed[1](); // ✅ 1
arrFixed[2](); // ✅ 2

// =============================================
// ✅ 7️⃣ Closures in Real-World Use Cases
// =============================================

// 🔹 Example 1: Private Variables using Closures
function bankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit: function (amount) {
      balance += amount;
      console.log("Deposited:", amount, "New Balance:", balance);
    },
    withdraw: function (amount) {
      if (amount > balance) {
        console.log("Insufficient funds!");
      } else {
        balance -= amount;
        console.log("Withdrawn:", amount, "New Balance:", balance);
      }
    },
    getBalance: function () {
      return balance;
    },
  };
}

const myAccount = bankAccount(100);
myAccount.deposit(50); // ✅ Deposited: 50, New Balance: 150
myAccount.withdraw(30); // ✅ Withdrawn: 30, New Balance: 120
console.log(myAccount.getBalance()); // ✅ 120

// 🔹 Example 2: Event Listener Closures
function createEventListener() {
  let count = 0;

  document.getElementById("clickButton").addEventListener("click", function () {
    count++;
    console.log("Button clicked", count, "times");
  });
}

// =============================================
// ✅ 8️⃣ Key Takeaways from Closure Interview Questions
// =============================================

/*
✔ Closures allow functions to "remember" variables from their outer scope.
✔ They are useful for creating private variables and maintaining state.
✔ Use closures to avoid common pitfalls, such as 'var' in loops.
✔ Closures enable advanced techniques like function currying and module patterns.
✔ They are widely used in real-world applications (e.g., event handlers, data encapsulation).
*/

// =============================================
// 🚀 Want More Examples? Let Me Know! 😊
// =============================================
