function sameValueZero(x, y) {
  if (typeof x === "number" && typeof y === "number") {
    // x and y are equal (may be -0 and 0) or they are both NaN
    return x === y || (x !== x && y !== y);
  }
  return x === y;
}

Array.prototype.myIncludes = function (value, index = 0) {
  if (this === null) {
    throw new TypeError(
      "Array.prototype.myIncludes can not be called on null or undefined"
    );
  }

  if (typeof this !== "object" || !("length" in this)) {
    throw new TypeError(
      "Array.prototype.myIncludes can not be called on non array like object"
    );
  }

  let length = this.length;

  index = index < 0 ? Math.max(index + length, 0) : Math.min(index, length);

  // console.log("values are ", length, index);

  for (let i = index; i < length; i++) {
    // console.log("executing ", i);
    if (sameValueZero(this[i], value)) {
      // console.log("yes");
      return true;
    }
  }

  return false;
};

const arr = [1, 2, 3, NaN, undefined, null, , "", "suhel"];
const arr1 = [1, 2, 3, , ,];

console.log(arr1.myIncludes(undefined));
console.log(arr1.includes(1));
