// =======================
// 1. Difference Between call(), apply(), and bind()
// =======================
/*
   - `call()` calls the function immediately with a given `this` and arguments.
   - `apply()` is similar to `call()` but takes arguments as an array.
   - `bind()` returns a new function with `this` bound but does NOT execute it immediately.
*/

// =======================
// 2. Example of call()
// =======================
function greetCall(greeting) {
  console.log(greeting + ", " + this.name);
}

const person1 = { name: "Suhel" };
greetCall.call(person1, "Hello"); // Output: "Hello, Suhel"

// =======================
// 3. Difference Between call() and apply()
// =======================
function greetApply(greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
}

const person2 = { name: "Ali" };

// Using call()
greetApply.call(person2, "Hi", "!");

// Using apply()
greetApply.apply(person2, ["Hi", "!"]); // Same output

// =======================
// 4. bind() Example
// =======================
const boundGreet = greetApply.bind(person2, "Hey");
boundGreet("!!"); // Output: "Hey, Ali!!"

// =======================
// 5. call() vs bind()
// =======================
const sayHello = function () {
  console.log("Hello, " + this.name);
};

const boundSayHello = sayHello.bind(person1);
sayHello(); // Output: "Hello, undefined"
boundSayHello(); // Output: "Hello, Suhel"

// =======================
// 6. Using apply() to find max in an array
// =======================
const numbers = [1, 5, 8, 3];
const maxNumber = Math.max.apply(null, numbers);
console.log(maxNumber); // Output: 8

// =======================
// 7. Function Borrowing with call()
// =======================
const obj1 = {
  name: "John",
  getName: function () {
    console.log(this.name);
  },
};

const obj2 = { name: "Doe" };
obj1.getName.call(obj2); // Output: "Doe"

// =======================
// 8. What happens if `null` or `undefined` is passed in call/apply?
// =======================
function showThis() {
  console.log(this);
}

showThis.call(null); // `this` becomes globalThis (window in browsers)

// =======================
// 9. bind() with arguments
// =======================
const boundFunc = greetApply.bind(person1, "Good Morning");
boundFunc("!"); // Output: "Good Morning, Suhel!"

// =======================
// 10. bind() and prototype chain
// =======================
function Person(name) {
  this.name = name;
}

const obj3 = { name: "Nadeem" };
const BoundPerson = Person.bind(obj3);
const p = new BoundPerson("Ali");
console.log(p.name); // Output: "Ali", NOT "Nadeem" because `new` takes precedence

// =======================
// 11. Overriding bind()
// =======================
function test() {
  console.log(this.name);
}

const bound1 = test.bind(obj1);
const bound2 = bound1.bind(obj2);
bound2(); // Output: "John", bind cannot be overridden!

// =======================
// 12. Implementing bind() polyfill
// =======================
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("myBind must be called on a function");
  }

  const fn = this;
  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};

const myBoundGreet = greetApply.myBind(person1, "Howdy");
myBoundGreet("!"); // Output: "Howdy, Suhel!"

// =======================
// 13. setTimeout with bind()
// =======================
const obj4 = {
  name: "Suhel",
  sayHello: function () {
    setTimeout(
      function () {
        console.log(this.name);
      }.bind(this), // Fix using bind
      1000
    );
  },
};

obj4.sayHello(); // Output: "Suhel" after 1s

// =======================
// 14. bind() multiple times
// =======================
const bound3 = test.bind(obj1).bind(obj2);
bound3(); // Output: "John", bind works only once!

// =======================
// 15. Performance implications of bind()
// =======================
/*
   - Using bind() excessively can create many function instances.
   - It is memory-intensive because each bind() call creates a new function.
   - Best to use call() or apply() when immediate execution is needed.
*/

console.log("All questions with answers executed successfully! 🚀");
