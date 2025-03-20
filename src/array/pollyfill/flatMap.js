Array.prototype.myFlatMap = function (cb, thisArg) {
  // Check if `this` is a valid array-like object
  if (this == null || typeof this !== "object" || !("length" in this)) {
    throw new TypeError(
      "Array.prototype.myFlatMap called on null or undefined"
    );
  }

  // Check if the callback is a function
  if (typeof cb !== "function") {
    throw new TypeError("Callback must be a function");
  }

  const result = [];

  // Iterate over the array
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      // Call the callback with the current element, index, and array
      const mappedValue = cb.call(thisArg, this[i], i, this);

      // If the mapped value is an array, flatten it by one level
      if (Array.isArray(mappedValue)) {
        result.push(...mappedValue);
      } else {
        result.push(mappedValue);
      }
    }
  }

  return result;
};

const arr = [1, 2, 3, 4];

// Test case 1: Basic usage
const result1 = arr.flatMap((x) => [x * 2]);
console.log(result1); // [2, 4, 6, 8]

const result2 = arr.myFlatMap((x) => [x * 2]);
console.log(result2); // [2, 4, 6, 8]

// Test case 2: Flattening nested arrays
const result3 = arr.flatMap((x) => [[x * 2]]);
console.log(result3); // [[2], [4], [6], [8]]

const result4 = arr.myFlatMap((x) => [[x * 2]]);
console.log(result4); // [[2], [4], [6], [8]]

// Test case 3: Non-array return values
const result5 = arr.flatMap((x) => x * 2);
console.log(result5); // [2, 4, 6, 8]

const result6 = arr.myFlatMap((x) => x * 2);
console.log(result6); // [2, 4, 6, 8]

// Test case 4: Sparse arrays
const sparseArray = [1, , 3, , 5];
const result7 = sparseArray.flatMap((x) => [x || 0]);
console.log(result7); // [1, 0, 3, 0, 5]

const result8 = sparseArray.myFlatMap((x) => [x || 0]);
console.log(result8); // [1, 0, 3, 0, 5]

// Test case 5: Array-like objects
const arrayLike = {
  length: 3,
  0: 1,
  1: 2,
  2: 3,
};

const result9 = Array.prototype.flatMap.call(arrayLike, (x) => [x * 2]);
console.log(result9); // [2, 4, 6]

const result10 = Array.prototype.myFlatMap.call(arrayLike, (x) => [x * 2]);
console.log(result10); // [2, 4, 6]
