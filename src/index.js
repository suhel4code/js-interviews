const obj = {
  firstName: "suhel",
};

function greet(a, b) {
  console.log(this.firstName, a, b);
}

Function.prototype.myBind = function (context, ...args) {
  context = context || globalThis;

  const fn = this;

  return function (...newArgs) {
    console.log("this value ", this);
    return fn.apply(context, [...args, ...newArgs]);
  };
};

const cal = greet.myBind(obj, 1);

cal(2);
