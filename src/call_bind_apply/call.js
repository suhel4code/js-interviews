Function.prototype.myCall = function (context, ...args) {
  //   console.log("this inside prototype ", this);
  context = context || globalThis;

  const symbol = Symbol();

  context[symbol] = this;

  const result = context[symbol](...args);

  delete context[symbol];

  return result;
};

function cal(a, b) {
  //   console.log("value of this ", this);
  console.log(this.firstName, a, b);
}

function cal2(a, b) {
  //   console.log("value of this ", this);
  console.log("form 2 ", this.firstName, a, b);
}

const obj1 = {
  firstName: "suhel",
};

const obj2 = {
  firstName: "nadeem",
};

// cal.call(obj1, 1, 2);
cal.myCall(obj1, 1, 2);
cal2.myCall(obj1, 1, 2);
