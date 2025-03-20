// basicCancelablePromise.js

/**
 * Creates a basic cancelable promise.
 * @param {Function} executor - The executor function for the promise.
 * @returns {Object} - An object containing the promise and a cancel function.
 */
function basicCancelablePromise(executor) {
  let cancel; // Stores the cancel function

  const promise = new Promise((resolve, reject) => {
    // Store the reject function to cancel the promise
    cancel = () => {
      reject(new Error("Promise canceled"));
    };

    // Execute the executor function
    executor(resolve, reject);
  });

  // Return the promise and the cancel function
  return { promise, cancel };
}

// Example usage
const { promise, cancel } = basicCancelablePromise((resolve, reject) => {
  setTimeout(() => {
    resolve("Operation completed!");
  }, 2000);
});

promise
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });

// Cancel the promise after 1 second
setTimeout(() => {
  cancel();
}, 1000);
