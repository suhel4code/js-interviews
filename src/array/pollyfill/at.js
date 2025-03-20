Array.prototype.myAt = function (index) {
  // Ensure `this` is a valid object
  if (this == null) {
    throw new TypeError("Array.prototype.myAt called on null or undefined");
  }

  // Convert index to an integer
  const value = Math.trunc(Number(index));

  // Handle non-integer indices
  if (!Number.isInteger(value)) {
    return undefined;
  }

  // Calculate the actual index
  const newIndex = value < 0 ? this.length + value : value;

  // Return undefined if the index is out of bounds
  if (newIndex < 0 || newIndex >= this.length) {
    return undefined;
  }

  return this[newIndex];
};