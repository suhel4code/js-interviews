const promise1 = () =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res("first");
    }, 300);
  });

const promise2 = () =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res("second");
    }, 1000);
  });

const promise3 = () =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res("third");
    }, 1000);
  });

// 1
function cal2(promises) {
  return promises.reduce((chain, currentPromise) => {
    return chain.then((results) => {
      return currentPromise().then((result) => {
        results.push(result);
        return results;
      });
    });
  }, Promise.resolve([]));
}

// 2
async function executePromisesInSequence(promises) {
  const results = [];
  for (const promiseFunc of promises) {
    const result = await promiseFunc();
    results.push(result);
  }
  return results;
}

// 3
async function executePromisesInSequence(promises) {
  const results = [];
  for (const promiseFunc of promises) {
    try {
      const result = await promiseFunc();
      results.push(result);
    } catch (error) {
      console.error("Error in promise:", error);
      // Optionally, you can decide whether to continue or stop
      // break; // Stop execution on error
    }
  }
  return results;
}

cal2([promise1, promise2, promise3]).then((res) => console.log(res));
