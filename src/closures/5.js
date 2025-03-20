// =============================================
// 🔥 Advanced JavaScript Closures - Interview Questions
// =============================================

// ✅ 1️⃣ What will be the output of this closure?
function outerFunction() {
  let count = 0;

  return function innerFunction() {
    count++;
    console.log(count);
  };
}

const counter1 = outerFunction();
const counter2 = outerFunction();

counter1(); // ✅ Output: 1
counter1(); // ✅ Output: 2
counter2(); // ✅ Output: 1 (separate closure)
counter2(); // ✅ Output: 2

// =============================================
// ✅ 2️⃣ Closures Inside Asynchronous Code
// =============================================
function asyncClosure() {
  for (var i = 1; i <= 3; i++) {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  }
}

asyncClosure(); // ❌ Output: 4, 4, 4 (due to var)

// ✅ FIX using 'let' (block scope)
function asyncClosureFixed() {
  for (let i = 1; i <= 3; i++) {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  }
}

asyncClosureFixed(); // ✅ Output: 1, 2, 3

// ✅ FIX using IIFE (Immediately Invoked Function Expression)
function asyncClosureFixedIIFE() {
  for (var i = 1; i <= 3; i++) {
    (function (i) {
      setTimeout(() => {
        console.log(i);
      }, 1000);
    })(i);
  }
}

asyncClosureFixedIIFE(); // ✅ Output: 1, 2, 3

// =============================================
// ✅ 3️⃣ Implement API Caching with Closures
// =============================================
function apiCache() {
  let cache = {}; // Private cache object

  return async function (url) {
    if (cache[url]) {
      console.log("Returning from cache:", url);
      return cache[url];
    } else {
      console.log("Fetching from API:", url);
      const response = await fetch(url);
      const data = await response.json();
      cache[url] = data;
      return data;
    }
  };
}

const fetchWithCache = apiCache();
// Uncomment below lines to test in a browser environment
// fetchWithCache("https://jsonplaceholder.typicode.com/todos/1"); // Fetches from API
// fetchWithCache("https://jsonplaceholder.typicode.com/todos/1"); // Returns from cache

// =============================================
// ✅ 4️⃣ Closures Inside an Object
// =============================================
const obj = {
  count: 0,
  increment: function () {
    return function () {
      this.count++;
      console.log(this.count);
    };
  },
};

const inc = obj.increment();
inc(); // ❌ Output: NaN (this refers to global scope)

// ✅ Fix using .bind()
const objFixed = {
  count: 0,
  increment: function () {
    return function () {
      this.count++;
      console.log(this.count);
    }.bind(this);
  },
};

const incFixed = objFixed.increment();
incFixed(); // ✅ Output: 1

// ✅ Fix using Arrow Function (lexical `this`)
const objFixedArrow = {
  count: 0,
  increment: function () {
    return () => {
      this.count++;
      console.log(this.count);
    };
  },
};

const incFixedArrow = objFixedArrow.increment();
incFixedArrow(); // ✅ Output: 1

// =============================================
// ✅ 5️⃣ Implement a `once()` Function with Closures
// =============================================
function once(fn) {
  let executed = false;

  return function (...args) {
    if (!executed) {
      executed = true;
      return fn(...args);
    } else {
      console.log("Function already executed");
    }
  };
}

const initialize = once(() => console.log("Initialized!"));

initialize(); // ✅ Output: "Initialized!"
initialize(); // ❌ Output: "Function already executed"

// =============================================
// ✅ 6️⃣ Closure with Hoisting Issue
// =============================================
function trickyClosure() {
  var x = 10;

  return function () {
    console.log(x);
    var x = 20; // Hoisted as `var x;`
  };
}

const fn = trickyClosure();
fn(); // ❌ Output: undefined (hoisting issue)

// ✅ Fix using `let`
function trickyClosureFixed() {
  let x = 10;

  return function () {
    console.log(x);
  };
}

const fnFixed = trickyClosureFixed();
fnFixed(); // ✅ Output: 10

// =============================================
// ✅ 7️⃣ Closures in Event Listeners
// =============================================
function eventClosure() {
  let count = 0;

  document
    .getElementById("clickButton")
    ?.addEventListener("click", function () {
      count++;
      console.log("Button clicked", count, "times");
    });
}

// Uncomment this line to test in a browser environment
// eventClosure();

// =============================================
// ✅ 8️⃣ JavaScript Module Pattern (Closures)
// =============================================
const CounterModule = (function () {
  let count = 0; // Private variable

  return {
    increment: function () {
      count++;
      console.log("Count:", count);
    },
    decrement: function () {
      count--;
      console.log("Count:", count);
    },
    getCount: function () {
      return count;
    },
  };
})();

CounterModule.increment(); // ✅ Output: Count: 1
CounterModule.increment(); // ✅ Output: Count: 2
console.log(CounterModule.getCount()); // ✅ Output: 2

// =============================================
// 🚀 Key Takeaways
// =============================================

/*
✔ Closures allow functions to "remember" variables from their outer scope.
✔ They are useful for creating private variables and maintaining state.
✔ Common issues include:
  - Loop scope issues (use `let` or IIFE)
  - Hoisting problems (use `let`)
  - Incorrect `this` binding (use `.bind()` or arrow functions)
✔ Used in real-world applications such as:
  - Function caching
  - API rate limiting
  - Event handlers
  - Module pattern
*/

// =============================================
// 🚀 Want More? Let Me Know! 😊
// =============================================
