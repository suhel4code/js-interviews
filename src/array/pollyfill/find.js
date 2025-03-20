Array.prototype.myFind = function (cb, thisArg) {
  // Check if the callback is a function
  if (typeof cb !== "function") {
    throw new TypeError("Callback must be a function");
  }

  // Check if `this` is a valid array-like object
  if (this == null || typeof this !== "object" || !("length" in this)) {
    throw new TypeError("Array.prototype.myFind called on null or undefined");
  }

  const length = this.length;

  // Iterate over the array
  for (let i = 0; i < length; i++) {
    // Access the element (empty slots will return `undefined`)
    const element = this[i];

    // Invoke the callback with the correct arguments
    if (cb.call(thisArg, element, i, this)) {
      return element;
    }
  }

  // Return undefined if no element satisfies the callback
  return undefined;
};

const obj = { name: "suhel" };

const arr = [, , { name: "suhel" }, { name: "nadeem" }, { name: "test" }];

function cb(el, index, arr) {
  if (el?.name === this.name) {
    return true;
  }
  return false;
}

// Native find
console.log(arr.find(cb, obj)); // { name: 'suhel' }

// Polyfill
console.log(arr.myFind(cb, obj)); // { name: 'suhel' }

// Test with sparse array
const sparseArray = [1, , , 4, 5];
console.log(sparseArray.myFind((el) => el === undefined)); // undefined (treats empty slots as `undefined`)

// Test with no matching element
console.log(arr.myFind((el) => el?.name === "unknown")); // undefined

// Test with thisArg
const thisArg = { name: "nadeem" };
console.log(arr.myFind(cb, thisArg)); // { name: 'nadeem' }
