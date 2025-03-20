// 1 using closure
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("mybind must be called on function");
  }

  const fn = this;

  return function (...newArgs) {
    const symbol = Symbol();

    context = context || globalThis;

    context[symbol] = fn;

    const result = context[symbol](...args, ...newArgs);

    delete context[symbol];

    return result;
  };
};

function cal(a, b, c) {
  console.log("value of this is ", this, this.firstName, a, b, c);
}

const obj = {
  firstName: "suhel",
};

const bind = cal.myBind(null, 1, 2);

console.log(bind(3));

// 2 using apply
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("mybind must be called on function");
  }

  const fn = this;

  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};

function cal(a, b, c) {
  console.log("value of this is ", this, this.firstName, a, b, c);
}

const obj = {
  firstName: "suhel",
};

const bind = cal.myBind(null, 1, 2);

console.log(bind(3));

// 3 using call
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("mybind must be called on function");
  }

  const fn = this;

  return function (...newArgs) {
    return fn.call(context, ...args, ...newArgs);
  };
};

function cal(a, b, c) {
  console.log("value of this is ", this, this.firstName, a, b, c);
}

const obj = {
  firstName: "suhel",
};

const bind = cal.myBind(null, 1, 2);

console.log(bind(3));
