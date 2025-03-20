// Using iterator function
Array.prototype.myEntries = function () {
  // Ensure `this` is a valid object
  if (this == null) {
    throw new TypeError("Array.prototype.myEntries called on null or undefined");
  }

  let index = 0; // Track the current index
  const length = this.length; // Length of the array

  // Return an iterator object
  return {
    next: () => {
      if (index < length) {
        // Yield the current index and value
        return { value: [index, this[index]], done: false };
      } else {
        // Signal that iteration is complete
        return { value: undefined, done: true };
      }
    },
    // Make the iterator iterable
    [Symbol.iterator]: function () {
      return this;
    },
  };
};

// using generator function
Array.prototype.myEntries = function* () {
  // Ensure `this` is a valid object
  if (this == null) {
    throw new TypeError("Array.prototype.myEntries called on null or undefined");
  }

  const length = this.length; // Length of the array

  // Iterate over the array and yield [index, value] pairs
  for (let index = 0; index < length; index++) {
    yield [index, this[index]];
  }
};