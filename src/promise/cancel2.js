// abortControllerCancelablePromise.js

/**
 * Creates a cancelable promise using AbortController.
 * @param {Function} executor - The executor function for the promise.
 * @returns {Object} - An object containing the promise and a cancel function.
 */
function abortControllerCancelablePromise(executor) {
  const abortController = new AbortController();
  const { signal } = abortController;

  const promise = new Promise((resolve, reject) => {
    // Pass the signal to the executor
    executor(resolve, reject, signal);

    // Handle abort event
    signal.addEventListener("abort", () => {
      reject(new Error("Promise canceled"));
    });
  });

  const cancel = () => {
    abortController.abort();
  };

  return { promise, cancel };
}

// Example usage
const { promise, cancel } = abortControllerCancelablePromise(
  (resolve, reject, signal) => {
    const timeoutId = setTimeout(() => {
      resolve("Operation completed!");
    }, 2000);

    // Cleanup on abort
    signal.addEventListener("abort", () => {
      clearTimeout(timeoutId);
      console.log("Cleanup: Timeout cleared");
    });
  }
);

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
