Array.prototype.myConcat = function (...args) {
  // Ensure `this` is a valid object
  if (this == null) {
    throw new TypeError("Array.prototype.myConcat called on null or undefined");
  }

  // Create a new array to store the result
  const res = [];

  // Copy elements from `this` array, preserving holes
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      res.push(this[i]);
    } else {
      // Preserve holes by increasing the length without adding elements
      res.length = i + 1;
    }
  }

  // Handle arguments
  for (const el of args) {
    if (Array.isArray(el) || (el && typeof el[Symbol.isConcatSpreadable] !== 'undefined' ? el[Symbol.isConcatSpreadable] : Array.isArray(el))) {
      // Copy elements from array-like objects or arrays, preserving holes
      for (let i = 0; i < el.length; i++) {
        if (i in el) {
          res.push(el[i]);
        } else {
          // Preserve holes by increasing the length without adding elements
          res.length = res.length + 1;
        }
      }
    } else {
      // Push non-array arguments directly
      res.push(el);
    }
  }

  return res;
};

const arr = [1,2,3];

console.log(arr.concat([1,2,,3]))
console.log(arr.myConcat([1,2,,3]))