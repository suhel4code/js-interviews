Array.prototype.myCopyWithin = function (target, start = 0, end = this.length) {
  // Convert negative indices to positive
  const length = this.length;

  target = target < 0 ? Math.max(length + target, 0) : Math.min(target, length);
  start = start < 0 ? Math.max(length + start, 0) : Math.min(start, length);
  end = end < 0 ? Math.max(length + end, 0) : Math.min(end, length);

  // Handle edge cases
  if (target >= length || start >= end) {
    return this;
  }

  // Calculate the number of elements to copy
  const count = Math.min(end - start, length - target);

  // Handle overlapping ranges
  if (start < target && target < start + count) {
    for (let i = count - 1; i >= 0; i--) {
      this[target + i] = this[start + i];
    }
  } else {
    for (let i = 0; i < count; i++) {
      this[target + i] = this[start + i];
    }
  }

  return this;
};