class MyPromise {
  constructor(executor) {
    this.state = "pending"; // Initial state
    this.value = undefined; // Value when fulfilled
    this.reason = undefined; // Reason when rejected
    this.onFulfilledCallbacks = []; // Store fulfilled callbacks
    this.onRejectedCallbacks = []; // Store rejected callbacks

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach(
          (callback) => queueMicrotask(() => callback(this.value)) // Use queueMicrotask for async execution
        );
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach(
          (callback) => queueMicrotask(() => callback(this.reason)) // Use queueMicrotask for async execution
        );
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err); // If executor throws an error, reject the promise
    }
  }

  then(onFulfilled, onRejected) {
    // Return a new MyPromise to support chaining
    return new MyPromise((resolve, reject) => {
      const handleFulfilled = (value) => {
        try {
          if (typeof onFulfilled === "function") {
            const result = onFulfilled(value); // Call onFulfilled and get the result
            if (result instanceof MyPromise) {
              // If the result is a promise, wait for it to resolve
              result.then(resolve, reject);
            } else {
              resolve(result); // Resolve with the non-promise value
            }
          } else {
            resolve(value); // If onFulfilled is not a function, pass the value through
          }
        } catch (err) {
          reject(err); // If onFulfilled throws an error, reject the new promise
        }
      };

      const handleRejected = (reason) => {
        try {
          if (typeof onRejected === "function") {
            const result = onRejected(reason); // Call onRejected and get the result
            if (result instanceof MyPromise) {
              // If the result is a promise, wait for it to resolve
              result.then(resolve, reject);
            } else {
              resolve(result); // Resolve with the non-promise value
            }
          } else {
            reject(reason); // If onRejected is not a function, pass the reason through
          }
        } catch (err) {
          reject(err); // If onRejected throws an error, reject the new promise
        }
      };

      if (this.state === "fulfilled") {
        queueMicrotask(() => handleFulfilled(this.value)); // Use queueMicrotask for async execution
      } else if (this.state === "rejected") {
        queueMicrotask(() => handleRejected(this.reason)); // Use queueMicrotask for async execution
      } else {
        // If pending, store the callbacks for later execution
        this.onFulfilledCallbacks.push(handleFulfilled); // No queueMicrotask here
        this.onRejectedCallbacks.push(handleRejected); // No queueMicrotask here
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected); // catch is just a shorthand for then(null, onRejected)
  }

  static resolve(value) {
    return new MyPromise((resolve) => {
      resolve(value); // Resolve immediately with the given value
    });
  }

  static reject(reason) {
    return new MyPromise((_, reject) => {
      reject(reason); // Reject immediately with the given reason
    });
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const results = []; // Array to store resolved values
      let completed = 0; // Counter to track completed promises

      if (promises.length === 0) {
        resolve(results); // If no promises, resolve immediately
        return;
      }

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise)
          .then((value) => {
            results[index] = value; // Store resolved value
            completed++;
            if (completed === promises.length) {
              resolve(results); // Resolve when all promises are done
            }
          })
          .catch((err) => {
            reject(err); // Reject if any promise rejects
          });
      });
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        MyPromise.resolve(promise)
          .then((value) => {
            resolve(value); // Resolve with the first resolved value
          })
          .catch((err) => {
            reject(err); // Reject with the first rejection reason
          });
      });
    });
  }

  static allSettled(promises) {
    return new MyPromise((resolve) => {
      const results = []; // Array to store results
      let completed = 0; // Counter to track completed promises

      if (promises.length === 0) {
        resolve(results); // If no promises, resolve immediately
        return;
      }

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          (value) => {
            results[index] = { status: "fulfilled", value }; // Store fulfilled result
            completed++;
            if (completed === promises.length) {
              resolve(results); // Resolve when all promises are settled
            }
          },
          (reason) => {
            results[index] = { status: "rejected", reason }; // Store rejected result
            completed++;
            if (completed === promises.length) {
              resolve(results); // Resolve when all promises are settled
            }
          }
        );
      });
    });
  }

  static any(promises) {
    return new MyPromise((resolve, reject) => {
      const errors = []; // Array to store rejection reasons
      let rejectedCount = 0; // Counter to track rejected promises

      if (promises.length === 0) {
        reject(new AggregateError([], "All promises were rejected")); // If no promises, reject immediately
        return;
      }

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          (value) => {
            resolve(value); // Resolve with the first resolved value
          },
          (reason) => {
            errors[index] = reason; // Store rejection reason
            rejectedCount++;
            if (rejectedCount === promises.length) {
              reject(new AggregateError(errors, "All promises were rejected")); // Reject if all promises reject
            }
          }
        );
      });
    });
  }
}
