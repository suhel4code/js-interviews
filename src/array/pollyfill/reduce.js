// Direc function
function myReduce(cb, arr, initialValue) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Expected an array");
  }

  if (typeof cb !== 'function') {
    throw new TypeError("Callback must be a function");
  }

  const length = arr.length;

  if (length === 0 && initialValue === undefined) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let res, startIndex;

  if (initialValue !== undefined) {
    res = initialValue;
    startIndex = 0;
  } else {
    // Find the first defined value if array is sparse
    let i = 0;
    while (i < length && !(i in arr)) {
      i++;
    }

    if (i >= length) {
      throw new TypeError("Reduce of empty array with no initial value");
    }

    res = arr[i];
    startIndex = i + 1;
  }

  for (let i = startIndex; i < length; i++) {
    if (i in arr) {
      res = cb(res, arr[i], i, arr);
    }
  }

  return res;
}

// Outside function
function myReduce(cb, initialValue) {

  if (typeof cb !== 'function') {
    throw new TypeError("Callback must be a function");
  }

  const length = this.length;

  if (length === 0 && initialValue === undefined) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let res, startIndex;

  if (initialValue !== undefined) {
    res = initialValue;
    startIndex = 0;
  } else {
    // Find the first defined value if array is sparse
    let i = 0;
    while (i < length && !(i in this)) {
      i++;
    }

    if (i >= length) {
      throw new TypeError("Reduce of empty array with no initial value");
    }

    res = this[i];
    startIndex = i + 1;
  }

  for (let i = startIndex; i < length; i++) {
    if (i in this) {
      res = cb(res, this[i], i, this);
    }
  }

  return res;
}

const arr = [1,2,3,4];

function cb(acc,curr,index,arr) {
  return acc * curr;
}

Array.prototype.myReduce = myReduce;

console.log(arr.myReduce(cb,1))

// Direct pollyfill
Array.prototype.myReduce = function (cb, initialValue) {
  // Ensure `this` is a valid array-like object
  if (this == null || typeof this[Symbol.iterator] !== 'function') {
    throw new TypeError("Array.prototype.myReduce called on null or undefined");
  }

  // Ensure the callback is a function
  if (typeof cb !== 'function') {
    throw new TypeError("Callback must be a function");
  }

  const length = this.length;

  // Handle empty array with no initial value
  if (length === 0 && initialValue === undefined) {
    throw new TypeError("Reduce of empty array with no initial value is not allowed");
  }

  let res, startIndex;

  if (initialValue !== undefined) {
    res = initialValue;
    startIndex = 0;
  } else {
    // Find the first defined value in case of a sparse array
    let i = 0;
    while (i < length && !(i in this)) {
      i++;
    }

    // If no defined value is found, throw an error
    if (i >= length) {
      throw new TypeError("Reduce of empty array with no initial value is not allowed");
    }

    res = this[i];
    startIndex = i + 1;
  }

  // Iterate over the array and apply the callback
  for (let i = startIndex; i < length; i++) {
    if (i in this) {
      res = cb(res, this[i], i, this);
    }
  }

  return res;
};