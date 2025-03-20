// 1
console.log("start");

const promise = new Promise((res, rej) => {
  console.log(1);
  res("hey");
  console.log(2);
});

promise.then((res) => console.log(res));

console.log("end");

// 2
console.log("start");

const promise = new Promise((res, rej) => {
  console.log(1);
  res("hey");
  console.log(2);
});

promise.then((res) => console.log(res));

console.log("end");

// 3
console.log("start");

const promise = new Promise((res, rej) => {
  console.log(1);

  console.log(2);
});

promise.then((res) => console.log("res ", res));

console.log("end");

// 4
console.log("start");

const promise = () =>
  new Promise((resolve, rej) => {
    console.log(1);
    resolve("ehy ");
  });

console.log("middle");

promise().then((res) => console.log("res ", res));

console.log("end");
