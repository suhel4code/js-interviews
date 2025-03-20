Array.prototype.myForEach = function (cb, thisArg) {
  // Check if the callback is a function
  if (typeof cb !== "function") {
    throw new TypeError("Callback must be a function");
  }

  // Check if `this` is a valid array-like object
  if (this == null || typeof this !== "object" || !("length" in this)) {
    throw new TypeError(
      "Array.prototype.myForEach called on null or undefined"
    );
  }

  const length = this.length;

  // Iterate over the array
  for (let i = 0; i < length; i++) {
    // Skip empty slots in sparse arrays
    if (i in this) {
      // Invoke the callback with the correct arguments
      cb.call(thisArg, this[i], i, this);
    }
  }

  // Return undefined (implicitly)
};

const arr = [1, 2, 3, 4];

function cb(el, index, arr) {
  console.log(el);
}

// Native forEach
arr.forEach(cb); // Logs: 1, 2, 3, 4

// Polyfill
arr.myForEach(cb); // Logs: 1, 2, 3, 4

// Test with sparse array
const sparseArray = [1, , , 4];
sparseArray.forEach(cb); // Logs: 1, 4
sparseArray.myForEach(cb); // Logs: 1, 4

// Test with thisArg
const thisArg = { multiplier: 2 };
function cbWithThis(el, index, arr) {
  console.log(el * this.multiplier);
}

arr.forEach(cbWithThis, thisArg); // Logs: 2, 4, 6, 8
arr.myForEach(cbWithThis, thisArg); // Logs: 2, 4, 6, 8

// Test with array-like object
const arrayLike = {
  length: 3,
  0: 1,
  1: 2,
  2: 3,
};

Array.prototype.forEach.call(arrayLike, cb); // Logs: 1, 2, 3
Array.prototype.myForEach.call(arrayLike, cb); // Logs: 1, 2, 3
