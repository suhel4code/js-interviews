// Direct function
function myFilter(cb, arr,thisArg) {
  if (typeof cb !== 'function') {
    throw new Error(`${cb} is not a function`);
  }

  const res = [];

  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      if (cb.call(thisArg,arr[i], i, arr)) {
       res.push(arr[i])
      }
    }
  }

  return res;
}

const obj = {value : 2}

const arr = [1, 3, 4,  6];

const arrLike = {
  length:3,
  0:1,
  1:4,
  2:8
}

function cb(el,index,arr) {
  return el % this.value == 0 ? true : false;
}

console.log(myFilter(cb, arr,obj));
console.log(myFilter(cb, arrLike,obj));


// Using Property
function myFilter(cb, thisArg) {
  if (typeof cb !== 'function') {
    throw new Error(`${cb} is not a function`);
  }

  const res = [];

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      if (cb.call(thisArg,this[i], i, this)) {
       res.push(this[i])
      }
    }
  }

  return res;
}

const obj = {value : 2}

const arr = [1, 3, 4,  6];

const arrLike = {
  length:3,
  0:1,
  1:4,
  2:8
}

function cb(el,index,arr) {
  return el % this.value == 0 ? true : false;
}

Array.prototype.myFilter = myFilter;

console.log(arr.myFilter(cb,obj));
console.log(Array.prototype.myFilter.call(arrLike,cb,obj));


// Using Inplace
function myFilter(cb, thisArg) {
  if (typeof cb !== 'function') {
    throw new Error(`${cb} is not a function`);
  }

  const res = [];

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      if (cb.call(thisArg,this[i], i, this)) {
       res.push(this[i])
      }
    }
  }

  return res;
}

const obj = {value : 2}

const arr = [1, 3, 4,  6];

const arrLike = {
  length:3,
  0:1,
  1:4,
  2:8
}

function cb(el,index,arr) {
  return el % this.value == 0 ? true : false;
}

Array.prototype.myFilter = function (cb,thisArg) {
    if (typeof cb !== 'function') {
    throw new Error(`${cb} is not a function`);
  }

  const res = [];

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      if (cb.call(thisArg,this[i], i, this)) {
       res.push(this[i])
      }
    }
  }

  return res;
};

console.log(arr.myFilter(cb,obj));
console.log(Array.prototype.myFilter.call(arrLike,cb,obj));
