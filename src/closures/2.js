// 📌 JavaScript Interview Questions on Functions

// ===========================================
// 🔹 Example 1: Using var inside a loop
// ===========================================
function cal() {
  for (var i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log(i); // ❌ Outputs 3, 3, 3
    }, 100);
  }
}

cal();

/*
✅ Why does this happen?
- `var` is function-scoped, meaning there is only one `i` shared across all iterations.
- `setTimeout` is asynchronous and runs after the loop completes.
- By the time `setTimeout` runs, `i = 3` (loop has already finished).
*/

// ===========================================
// 🔹 Fix 1: Using let to create block scope
// ===========================================
function calFixed() {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log(i); // ✅ Outputs 0, 1, 2
    }, 100);
  }
}

calFixed();

/*
✅ Why does this work?
- `let` is block-scoped, meaning a new `i` is created for each loop iteration.
- Each `setTimeout` function captures a separate `i` value.
*/

// ===========================================
// 🔹 Example 2: Fix using a function
// ===========================================
function cal2() {
  for (var i = 0; i < 3; i++) {
    function second(i) {
      setTimeout(() => {
        console.log(i); // ✅ Outputs 0, 1, 2
      }, 100);
    }
    second(i);
  }
}

cal2();

/*
✅ Why does this work?
- Each call to `second(i)` creates a **new function execution context**.
- The function `second(i)` takes `i` as a **parameter**, so each `setTimeout` remembers its own copy.
*/

// ===========================================
// 🔹 Does second(i) create a new function each time?
// ===========================================
function calDebug() {
  for (var i = 0; i < 3; i++) {
    function second(i) {
      console.log(`Creating new function with i = ${i}`);
      setTimeout(() => {
        console.log(i);
      }, 100);
    }
    second(i);
  }
}

calDebug();

/*
✅ Expected Output:
Creating new function with i = 0
Creating new function with i = 1
Creating new function with i = 2
0
1
2

✅ Why?
- Each time `second(i)` is called, a **new function** is created.
- Each function gets a separate copy of `i`.
*/

// ===========================================
// 🔹 Alternative Fix: Using IIFE (Immediately Invoked Function Expression)
// ===========================================
function calIIFE() {
  for (var i = 0; i < 3; i++) {
    (function (i) {
      setTimeout(() => {
        console.log(i); // ✅ Outputs 0, 1, 2
      }, 100);
    })(i);
  }
}

calIIFE();

/*
✅ Why does this work?
- The **IIFE** creates a new scope for each iteration.
- Each function call captures its own `i` value.
*/

// ===========================================
// 🔹 Summary of Fixes
// ===========================================
/*
| Method            | New Function Created Each Loop? | Scope Fix? | Output |
|------------------|--------------------------------|------------|--------|
| `cal()` using `var` | ❌ No | ❌ No | `3, 3, 3` |
| `cal2()` with `second(i)` | ✅ Yes (new function each loop) | ✅ Yes | `0, 1, 2` |
| `calIIFE()` using IIFE | ✅ Yes (new function each loop) | ✅ Yes | `0, 1, 2` |
| `let` inside loop | ✅ Yes (each loop has a new block scope) | ✅ Yes | `0, 1, 2` |
*/

// ===========================================
// 🔹 Key Takeaways
// ===========================================
/*
✔ `var` is **function-scoped**, so the loop does not create a new `i` for each iteration.
✔ `let` is **block-scoped**, creating a new `i` in each loop iteration.
✔ Wrapping the `setTimeout()` inside a function and passing `i` fixes the issue.
✔ Using **IIFE** (Immediately Invoked Function Expression) also works.
*/
