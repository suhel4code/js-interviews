function deepEqual(obj1, obj2) {
  // Handle primitive types and null/undefined
  if (obj1 === obj2) return true;

  // Handle NaN (NaN is the only value in JS that is not equal to itself)
  if (Number.isNaN(obj1) && Number.isNaN(obj2)) return true;

  // If either is not an object or is null, they are not equal
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }

  // Get the keys of both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // If the number of keys is different, they are not equal
  if (keys1.length !== keys2.length) return false;

  // Recursively compare each property
  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

// Example usage:
const objA = { a: 1, b: { c: 2, d: [3, 4] } };
const objB = { a: 1, b: { c: 2, d: [3, 4] } };
const objC = { a: 1, b: { c: 2, d: [3, 5] } };

console.log(deepEqual(objA, objB)); // true
console.log(deepEqual(objA, objC)); // false

// with circular reference
function deepEqual(obj1, obj2, seen = new WeakMap()) {
  if (obj1 === obj2) return true;
  if (Number.isNaN(obj1) && Number.isNaN(obj2)) return true;
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }

  // Check if we've already compared these objects
  if (seen.has(obj1) && seen.get(obj1) === obj2) return true;
  seen.set(obj1, obj2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key], seen)) {
      return false;
    }
  }

  return true;
}

// Example with circular reference
const objA = { a: 1 };
objA.self = objA;
const objB = { a: 1 };
objB.self = objB;

console.log(deepEqual(objA, objB)); // true
