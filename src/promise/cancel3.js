// cleanupCancelablePromise.js

/**
 * Creates a cancelable promise with cleanup logic.
 * @param {Function} executor - The executor function for the promise.
 * @returns {Object} - An object containing the promise and a cancel function.
 */
function cleanupCancelablePromise(executor) {
  let cancel; // Stores the cancel function
  let isCanceled = false; // Tracks whether the promise has been canceled

  const promise = new Promise((resolve, reject) => {
    /**
     * Registers cleanup logic to be executed if the promise is canceled.
     * @param {Function} cleanup - The cleanup function to execute on cancellation.
     */
    const onCancel = (cleanup) => {
      if (isCanceled) {
        // If already canceled, execute the cleanup immediately
        cleanup();
      }
    };

    // Execute the executor function
    executor(resolve, reject, onCancel);

    /**
     * Cancels the promise and optionally executes cleanup logic.
     * @param {Function} cleanup - The cleanup function to execute on cancellation.
     */
    cancel = (cleanup) => {
      isCanceled = true; // Mark the promise as canceled
      if (cleanup) {
        cleanup(); // Execute the cleanup function
      }
      reject(new Error("Promise canceled")); // Reject the promise with a cancellation error
    };
  });

  // Return the promise and the cancel function
  return { promise, cancel };
}

// Example usage
const { promise, cancel } = cleanupCancelablePromise(
  (resolve, reject, onCancel) => {
    // Simulate an asynchronous operation with a timeout
    const timeoutId = setTimeout(() => {
      resolve("Operation completed!");
    }, 2000);

    // Register cleanup logic to clear the timeout if the promise is canceled
    onCancel(() => {
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
