const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("second");
    resolve("frist");
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("one");
    resolve("second there");
  }, 3000);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("rejced");
    reject("hi there");
  }, 1000);
});

Promise.myAllSettled = function (promises) {
  return new Promise((resolve) => {
    let results = [];
    let completed = 0;

    if (promises.length === 0) {
      return resolve([]); // Resolve immediately for an empty array
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          results[index] = { status: "rejected", reason };
        })
        .finally(() => {
          completed++;
          if (completed === promises.length) {
            resolve(results); // Resolve only when all promises settle
          }
        });
    });
  });
};

Promise.allSettled([promise1, promise2, promise3]).then((res) =>
  console.log(res)
);
