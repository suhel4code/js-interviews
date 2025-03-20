/*
    Promise.all: Fails fast if any promise rejects. Other promises 
    continue executing, but their results are ignored.

    Promise.allSettled: Waits for all promises to 
    settle (resolve or reject) and returns their outcomes.

*/

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("second");
    resolve("frist");
  }, 3000);
});

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("one");
    resolve("second there");
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("rejced");
    reject("hi there");
  }, 1000);
});

Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Argument must be an array"));
    }

    let results = [];
    let completed = 0;

    if (promises.length === 0) {
      return resolve([]); // Resolve immediately for empty array
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => {
          console.log("resolved ", res);
          results[index] = res;
          completed++;
          if (completed === promises.length) {
            return resolve(results);
          }
        })
        .catch((error) => {
          return reject(error);
        });
    });
  });
};

Promise.myAll2 = function (promises) {
  return new Promise(async (resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Argument must be an array"));
    }

    let results = [];

    try {
      for (let i = 0; i < promises.length; i++) {
        results[i] = await promises[i]; // Await each promise
      }
      resolve(results); // ✅ Return resolved array when all succeed
    } catch (error) {
      reject(error); // ❌ Reject immediately on first failure
    }
  });
};

// Promise.myAll([promise1, promise2, promise])
//   .then((res) => console.log("aall ", res))
//   .catch((error) => {
//     console.log("error is ", error);
//   });

Promise.myAll2([promise1, promise2, promise])
  .then((res) => console.log("aall ", res))
  .catch((error) => {
    console.log("error is ", error);
  });
