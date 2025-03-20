Array.prototype.myFlat = function (depth = 1) {
  // Check if `this` is a valid array-like object
  if (this == null || typeof this !== "object" || !("length" in this)) {
    throw new TypeError(
      "Array.prototype.myFlat can only be called on array-like objects"
    );
  }

  // Coerce depth to an integer (or Infinity)
  depth = Math.floor(Number(depth));
  if (isNaN(depth) || depth < 0) {
    depth = 0;
  }

  // If depth is 0, return a shallow copy of the array
  if (depth === 0) {
    return [...this];
  }

  const result = [];

  // Iterate over the array
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      const element = this[i];
      if (Array.isArray(element)) {
        // Recursively flatten the element
        const flattened = element.myFlat(depth - 1);
        result.push(...flattened);
      } else {
        // Push non-array elements directly
        result.push(element);
      }
    }
  }

  return result;
};

const arr = [1, 2, 3, [4, 5, [6, 7]]];

// Test with depth = 2
console.log(arr.flat(2)); // [1, 2, 3, 4, 5, 6, 7]
console.log(arr.myFlat(2)); // [1, 2, 3, 4, 5, 6, 7]

// Test with depth = 1
console.log(arr.flat(1)); // [1, 2, 3, 4, 5, [6, 7]]
console.log(arr.myFlat(1)); // [1, 2, 3, 4, 5, [6, 7]]

// Test with depth = 0
console.log(arr.flat(0)); // [1, 2, 3, [4, 5, [6, 7]]]
console.log(arr.myFlat(0)); // [1, 2, 3, [4, 5, [6, 7]]]

// Test with sparse array
const sparseArray = [1, , , 4, [5, , 7]];
console.log(sparseArray.flat(1)); // [1, 4, 5, undefined, 7]
console.log(sparseArray.myFlat(1)); // [1, 4, 5, undefined, 7]

// Test with array-like object
const arrayLike = {
  length: 3,
  0: [1, 2],
  1: { length: 2, 0: 3, 1: 4 }, // Not flattened
  2: 5,
  3: 3, // Ignored because length is 3
};

console.log(Array.prototype.flat.call(arrayLike)); // [[1, 2], { length: 2, 0: 3, 1: 4 }, 5]
console.log(Array.prototype.myFlat.call(arrayLike)); // [[1, 2], { length: 2, 0: 3, 1: 4 }, 5]
