Array.prototype.myEvery = function (cb, thisArg) {
  // Ensure `this` is a valid object
  if (this == null) {
    throw new TypeError("Array.prototype.myEvery called on null or undefined");
  }

  // Ensure `this` is an array-like object
  if (typeof this !== "object" || !("length" in this)) {
    throw new TypeError(
      "Array.prototype.myEvery called on non-array-like object"
    );
  }

  // Ensure the callback is a function
  if (typeof cb !== "function") {
    throw new TypeError(`${cb} is not a function`);
  }

  const length = this.length;

  // Iterate over the array-like object
  for (let i = 0; i < length; i++) {
    // Skip holes in sparse arrays or array-like objects
    if (i in this) {
      // Call the callback and return false if it returns a falsy value
      if (!cb.call(thisArg, this[i], i, this)) {
        return false;
      }
    }
  }

  // Return true if all elements pass the test
  return true;
};

const arr = [2, 4, 6, 8, 10];

const arrLike = {
  length: 3,
  0: 1,
  1: 2,
  2: 3,
};

const obj = { value: 30 };

function cb(el, index, arr) {
  return el > this.value;
}

// console.log(arr.every(cb, obj));
// console.log(arr.myEvery(cb, obj));

console.log(Array.prototype.every.call(arrLike, cb, obj));
console.log(Array.prototype.myEvery.call(arrLike, cb, obj));
