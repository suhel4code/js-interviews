const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log("second");
    reject("frist");
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log("one");
    reject("second there");
  }, 3000);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log("rejced");
    reject("hi there");
  }, 1000);
});

Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises) || promises.length === 0) {
      return reject(new AggregateError([], "All promises were rejected"));
    }

    let errors = [];
    let rejectedCount = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(resolve) // Resolve on first success
        .catch((error) => {
          errors[index] = error;
          rejectedCount++;

          if (rejectedCount === promises.length) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    });
  });
};

Promise.myAny([promise1, promise2, promise3])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
