class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

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
          resolve(onFulfilled ? onFulfilled(value) : value);
        } catch (error) {
          reject(error);
        }
      };

      const failureCallback = (reason) => {
        try {
          reject(onRejected ? onRejected(reason) : reason);
        } catch (error) {
          reject(error);
        }
      };

      if (this.state === "fulfilled") successCallback(this.value);
      else if (this.state === "rejected") failureCallback(this.reason);
      else {
        this.onFulfilledCallbacks.push(successCallback);
        this.onRejectedCallbacks.push(failureCallback);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(onFinally) {
    return this.then(onFinally, onFinally);
  }

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      let results = [];
      let completed = 0;

      promises.forEach((promise, index) => {
        promise
          .then((value) => {
            results[index] = value;
            completed++;
            if (completed === promises.length) resolve(results);
          })
          .catch(reject); // Fail fast if any promise rejects
      });
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => promise.then(resolve).catch(reject));
    });
  }

  static allSettled(promises) {
    return new MyPromise((resolve) => {
      let results = [];
      let completed = 0;

      promises.forEach((promise, index) => {
        promise
          .then((value) => {
            results[index] = { status: "fulfilled", value };
          })
          .catch((reason) => {
            results[index] = { status: "rejected", reason };
          })
          .finally(() => {
            completed++;
            if (completed === promises.length) resolve(results);
          });
      });
    });
  }

  static any(promises) {
    return new MyPromise((resolve, reject) => {
      let errors = [];
      let rejectedCount = 0;

      promises.forEach((promise) => {
        promise
          .then(resolve) // First success wins
          .catch((reason) => {
            errors.push(reason);
            rejectedCount++;
            if (rejectedCount === promises.length) {
              reject(errors);
            }
          });
      });
    });
  }
}
