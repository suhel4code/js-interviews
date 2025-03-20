Array.prototype.myFill = function (value, start = 0, end = this.length) {
  const length = this.length;

  // Handle negative start index
  start = start < 0 ? Math.max(length + start, 0) : Math.min(start, length);

  // Handle negative end index
  end = end < 0 ? Math.max(length + end, 0) : Math.min(end, length);

  // If start >= end, return the array unchanged
  if (start >= end) {
    return this;
  }

  // Fill the array
  for (let i = start; i < end; i++) {
    this[i] = value;
  }

  // Return the modified array
  return this;
};

const arr1 = [1, 2, 3, 4, 5];
console.log(arr1.myFill(0)); // [0, 0, 0, 0, 0]

const arr2 = [1, 2, 3, 4, 5];
console.log(arr2.myFill(0, 2)); // [1, 2, 0, 0, 0]

const arr3 = [1, 2, 3, 4, 5];
console.log(arr3.myFill(0, 1, 3)); // [1, 0, 0, 4, 5]

const arr4 = [1, 2, 3, 4, 5];
console.log(arr4.myFill(0, -3, -1)); // [1, 2, 0, 0, 5]

const arr5 = [1, 2, 3, 4, 5];
console.log(arr5.myFill(0, 3, 1)); // [1, 2, 3, 4, 5] (start >= end, no change)

const arr6 = [1, 2, 3, 4, 5];
console.log(arr6.myFill(0, 10)); // [1, 2, 3, 4, 5] (start >= length, no change)

const arr7 = [1, 2, 3, 4, 5];
console.log(arr7.myFill(0, -10)); // [0, 0, 0, 0, 0] (start < -length, treated as 0)

const sparseArray = [1, , , 4, 5];
sparseArray.myFill(0, 1, 3);
console.log(sparseArray); // [1, 0, 0, 4, 5] (works on sparse arrays)
