/**
 * 📌 JavaScript IIFE - Real-World Use Cases
 * -----------------------------------------
 * This file demonstrates how IIFE is used in practical applications,
 * including:
 * 1. Module Pattern (Encapsulation)
 * 2. Preventing Global Variable Pollution
 * 3. Creating Private Variables
 * 4. IIFE with Asynchronous Code
 * 5. Using IIFE in Event Listeners
 * 6. IIFE in Loops (Fixing Closure Issues)
 * 7. Caching API Calls with IIFE
 * 8. Singleton Pattern using IIFE
 */

// =====================================================
// 1️⃣ IIFE as a Module Pattern (Encapsulation)
// =====================================================
const CounterModule = (function () {
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
})();

CounterModule.increment(); // Counter: 1
CounterModule.increment(); // Counter: 2
console.log(CounterModule.getCount()); // ✅ 2

// console.log(CounterModule.count); // ❌ ERROR: Private variable

// =====================================================
// 2️⃣ Preventing Global Variable Pollution with IIFE
// =====================================================
// ✅ Without IIFE, global variables can clash
var globalVar = "I'm global!"; // Pollutes the global scope

// ✅ Using IIFE to avoid global scope pollution
(function () {
  var localVar = "I'm inside an IIFE!";
  console.log(localVar);
})();

// console.log(localVar); // ❌ ERROR: localVar is not defined outside

// =====================================================
// 3️⃣ Private Variables using IIFE
// =====================================================
// ✅ Using closures to keep data private
const UserModule = (function () {
  let users = [];

  return {
    addUser: function (name) {
      users.push(name);
      console.log(`User ${name} added`);
    },
    getUsers: function () {
      return users;
    },
  };
})();

UserModule.addUser("Alice");
UserModule.addUser("Bob");
console.log(UserModule.getUsers()); // ✅ ["Alice", "Bob"]

// console.log(users); // ❌ ERROR: users is private

// =====================================================
// 4️⃣ IIFE with Asynchronous Code (Fetching API Data)
// =====================================================
(async function fetchData() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    let data = await response.json();
    console.log("Fetched Data:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();

// =====================================================
// 5️⃣ IIFE in Event Listeners (To Avoid Conflicts)
// =====================================================
document.addEventListener(
  "DOMContentLoaded",
  (function () {
    let count = 0;

    return function () {
      count++;
      console.log("Page Loaded! Count:", count);
    };
  })()
);

// =====================================================
// 6️⃣ IIFE in Loops (Fixing Closure Issues)
// =====================================================
// ❌ Problem with `var` in loops
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("Without IIFE:", i), 1000);
}
// Output after 1 second: 3, 3, 3

// ✅ Solution using IIFE
for (var i = 0; i < 3; i++) {
  (function (i) {
    setTimeout(() => console.log("With IIFE:", i), 1000);
  })(i);
}
// Correct Output after 1 second: 0, 1, 2

// =====================================================
// 7️⃣ Caching API Calls using IIFE
// =====================================================
const DataCache = (function () {
  let cache = {}; // Private cache object

  return {
    fetchData: async function (url) {
      if (cache[url]) {
        console.log("Returning cached data:", cache[url]);
        return cache[url];
      }
      let response = await fetch(url);
      let data = await response.json();
      cache[url] = data;
      console.log("Fetched from API:", data);
      return data;
    },
  };
})();

// Calling API and storing in cache
DataCache.fetchData("https://jsonplaceholder.typicode.com/todos/1");
setTimeout(
  () => DataCache.fetchData("https://jsonplaceholder.typicode.com/todos/1"),
  2000
); // Cached data

// =====================================================
// 8️⃣ Singleton Pattern with IIFE
// =====================================================
// ✅ Ensures only one instance exists
const Singleton = (function () {
  let instance; // Private variable

  function createInstance() {
    return { name: "I am the only instance!" };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

console.log(instance1 === instance2); // ✅ true (same instance)
console.log(instance1.name); // ✅ "I am the only instance!"

// =====================================================
// ✅ Summary of Real-World IIFE Usage
// =====================================================
/**
 * - ✅ Encapsulation (Module Pattern)
 * - ✅ Prevents Global Variable Pollution
 * - ✅ Private Variables (Closures)
 * - ✅ Async/Await with IIFE for API Calls
 * - ✅ Fixing Loops with `var` using IIFE
 * - ✅ Event Listeners using IIFE
 * - ✅ Caching API Responses
 * - ✅ Singleton Pattern (Ensures one instance)
 */

console.log("✅ IIFE Real-World Examples Complete!");
