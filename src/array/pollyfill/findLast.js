Array.prototype.myFindLast = function (cb, thisArg) {
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
  for (let i = length - 1; i >= 0; i--) {
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

const arr = [
  ,
  ,
  { name: "suhel", age: 2 },
  { name: "nadeem" },
  { name: "test" },
  { name: "suhel", age: 1 },
];

function cb(el, index, arr) {
  if (el?.name === this.name) {
    return true;
  }
  return false;
}
