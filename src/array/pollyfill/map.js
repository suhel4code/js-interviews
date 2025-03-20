// Using Direct function

function mapPolyfill(cb, arr, thisArg) {
  if (typeof cb !== 'function') {
    throw new TypeError(`${cb} is not a function`);
  }

  if (!Array.isArray(arr)) {
    throw new TypeError(`${arr} is not an array`);
  }

  const res = new Array(arr.length); // Preserve the same array structure

  for (let i = 0; i < arr.length; i++) {
    if (i in arr) { // Skip holes, like native `.map()`
      res[i] = cb.call(thisArg, arr[i], i, arr);
    }
  }

  return res;
}

// Example usage:
const obj = { value: 3   };
const arr = [1, 2, 3]; // Sparse array with a hole at index 1

function cb(el, index, arr) {
  console.log('Value of this is:', this);
  return el * this.value;
}

console.log(mapPolyfill(cb, arr, obj)); 
// Output: [3, empty, 9] ✅ Matches built-in `.map()`


// Using custom function as method
function myMap(cb,  thisArg) {
  console.log('values are ',cb,arr,thisArg)
  if (typeof cb !== 'function') {
    throw new TypeError(`${cb} is not a function`);
  }

  if (!Array.isArray(this)) {
    throw new TypeError(`${this} is not an array`);
  }

  const res = new Array(this.length); // Preserve the same array structure

  for (let i = 0; i < this.length; i++) {
    if (i in this) { // Skip holes, like native `.map()`
      res[i] = cb.call(thisArg, this[i], i,this);
    }
  }

  return res;
}

// Example usage:
const obj = { value: 4 };
const arr = [1, 2, 3]; // Sparse array with a hole at index 1

function cb(el, index, arr) {
  console.log('Value of this is:', this);
  return el * this.value;
}

Array.prototype.myMap = myMap;

console.log(arr.myMap(cb,obj))


// Using function as property:
Array.prototype.myMap = function (cb, thisArg) {
  if (typeof cb !== 'function') {
    throw new TypeError(`${cb} is not a function`);
  }

  const res = new Array(this.length); // Preserve the same array structure

  for (let i = 0; i < this.length; i++) {
    if (i in this) { // Skip holes, like native `.map()`
      res[i] = cb.call(thisArg, this[i], i, this);
    }
  }

  return res;
};

// Example usage:
const obj = { value: 4 };
const arr = [1, , 3]; // Sparse array with a hole at index 1

function cb(el, index, arr) {
  console.log('Value of this is:', this);
  return el * this.value;
}

console.log(arr.myMap(cb, obj)); 
// Output: [4, empty, 12] ✅ Matches `.map()` behavior

