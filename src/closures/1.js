// 1

let count = 0;

(function () {
  if (count == 0) {
    let count = 1;
    console.log(count);
  }
  console.log(count);
})();

// 2
function keep(num) {
  return function add(value) {
    return num + value;
  };
}

const second = keep(10);

console.log(second(5));
console.log(second(15));

// 3
function find() {
  const arr = [];

  for (let i = 0; i < 10000000; i++) {
    arr[i] = i * i;
  }

  return function (num) {
    return arr[num];
  };
}

const keep = find();

console.log(keep(10));

// 4
// The output for will be 3 all time

function cal() {
  for (var i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log(i);
    }, 100);
  }
}

cal();

// The output for will be 0, 1,2 all time

function cal() {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log(i);
    }, 100);
  }
}

cal();

// 3
function cal() {
  let count = 0;

  return {
    add: function () {
      return ++count;
    },
    reset: function () {
      count = 0;
      return count;
    },
    byAmount: function (value) {
      count = count + value;
      return count;
    },
  };
}

let counter = cal();

console.log(counter.add());
console.log(counter.add());
console.log(counter.reset());
console.log(counter.byAmount(4));

// 4 runs function only once
function cal() {
  let called = 0;

  return function () {
    if (called > 0) {
      console.log("already runs");
    } else {
      console.log("subscribed");
      called++;
    }
  };
}

const welcome = cal();

welcome();
welcome();
welcome();
welcome();

// 5
function hello(a, b) {
  console.log("hello ", a, b);
}

// This is generic function in which passed function will run only once
function once(func, context) {
  let res;

  return function innner() {
    if (func) {
      res = func.apply(context || this, arguments);
      res = null;
    }

    return res;
  };
}

const second = once(hello);

second(1, 2);
second(1);

// console.log("second ", second(1, 2));

// 6
function add(a) {
  return function (b) {
    if (b) return add(a + b);
    return a;
  };
}

console.log(add(4)(2)(1)());

// 7
// Partial application of currying

function add(a) {
  return function (b, c) {
    return a + b + c;
  };
}

const x = add(1);

console.log(x(3, 4));

console.log(add(1)(3, 4));

// 7
function curr(func) {
  return function help(...args) {
    if (args.length >= func.length) {
      return func(...args);
    } else {
      return function (...next) {
        return help(...args, ...next);
      };
    }
  };
}

const sum = (a, b, c) => a + b + c;

const z = curr(sum);

console.log(z(1)(2, 3));
