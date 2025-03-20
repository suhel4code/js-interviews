class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;

    const resolve = (value) => {
      if (this.state === "pending") {
        console.log("promise is resolved");
        this.state = "fulfilled";
        this.value = value;
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.value = reason;
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    console.log("inside then ", this);
    if (this.state === "fulfilled" && onFulfilled) {
      onFulfilled(this.value);
    }
  }
}

const promise = new MyPromise((resolve, reject) => {
  // resolve("Hi");
  setTimeout(() => {
    resolve("hi");
  }, 0);
});

console.log("promise is ", promise);

promise.then((res) => {
  console.log("first is ", res);
});

console.log("promise is ", promise);
