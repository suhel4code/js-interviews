const pipe =
  (...fns) =>
  (initialValue) =>
    fns.reduce((acc, fn) => fn(acc), initialValue);

const compose =
  (...fns) =>
  (initialValue) =>
    fns.reduceRight((acc, fn) => fn(acc), initialValue);

// Example usage:
const add1 = (x) => x + 1;
const double = (x) => x * 2;

const piped = pipe(add1, double); // (x + 1) * 2
console.log(piped(3)); // Output: 8

const composed = compose(double, add1); // (x * 2) + 1
console.log(composed(3)); // Output: 7
