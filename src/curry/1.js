// 1
function first(a) {
  return function second(b) {
    console.log("values ", a, b);
  };
}

first(1)(2);

// 2
function first(a) {
  return function second(b) {
    return function third(c) {
      return a + b + c;
    };
  };
}

console.log(first(1)(2)(3));

// 3
function outer(op) {
  return function (a, b) {
    if (op === "add") return a + b;
    if (op === "sub") return a - b;
    if (op === "mul") return a * b;
    if (op === "div") return a / b;
  };
}

console.log(outer("add")(1, 2));

// 3
function add(a) {
  return function (b) {
    if (b) return add(a + b);
    return a;
  };
}

console.log(add(4)(2)(1)());
