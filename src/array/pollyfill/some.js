Array.prototype.mySome = function (cb, thisArg) {
  if (typeof cb !== "function") {
    throw new TypeError("Array.prototype.mySome callback must be a function");
  }

  if (typeof this !== "object" || this === null || !("length" in this)) {
    throw new TypeError(
      "Array.prototype.mySome can not be called on non-array-like object"
    );
  }

  const length = this.length;

  for (let i = 0; i < length; i++) {
    if (i in this && cb.call(thisArg, this[i], i, this)) {
      return true;
    }
  }

  return false;
};

// Test cases
const arr = [, , , 7, 2, 14, 9, 8, 11];

const arrLike = {
  length: 3,
  0: 1,
  1: 2,
  2: 3,
};

const obj = { value: 30 };

function cb(el, index, arr) {
  return el / 7 === 1 ? true : false;
}

console.log(arr.some(cb, obj)); // true
console.log(arr.mySome(cb, obj)); // true

console.log(Array.prototype.some.call(arrLike, cb, obj)); // false
console.log(Array.prototype.mySome.call(arrLike, cb, obj)); // false
