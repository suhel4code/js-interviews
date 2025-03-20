class MyPromise {
  constructor(executor) {
    this.state = "pending"; // "pending" | "fulfilled" | "rejected"
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = []; // Store success callbacks
    this.onRejectedCallbacks = []; // Store failure callbacks

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((callback) => callback(value));
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((callback) => callback(reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const successCallback = (value) => {
        try {
          if (onFulfilled) {
            const result = onFulfilled(value);
            if (result instanceof MyPromise) {
              result.then(resolve, reject); // If a Promise is returned, wait for it
            } else {
              resolve(result); // Pass the result to the next `.then()`
            }
          } else {
            resolve(value); // Pass through if no `onFulfilled` provided
          }
        } catch (error) {
          reject(error); // Catch errors in `.then()`
        }
      };

      const failureCallback = (reason) => {
        try {
          if (onRejected) {
            const result = onRejected(reason);
            if (result instanceof MyPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } else {
            reject(reason); // If no error handler, propagate the rejection
          }
        } catch (error) {
          reject(error);
        }
      };

      if (this.state === "fulfilled") {
        successCallback(this.value);
      } else if (this.state === "rejected") {
        failureCallback(this.reason);
      } else {
        this.onFulfilledCallbacks.push(successCallback);
        this.onRejectedCallbacks.push(failureCallback);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}
