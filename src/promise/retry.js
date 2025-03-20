/**
 * Retries a Promise-based function up to `retries` times with a fixed delay.
 * @param {Function} fn - A function that returns a Promise.
 * @param {number} retries - Number of retry attempts.
 * @param {number} delay - Delay between retries (in milliseconds).
 * @returns {Promise} - Resolves when the function succeeds, rejects after all retries fail.
 */
function retryPromise(fn, retries = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    const attempt = (triesLeft) => {
      fn()
        .then(resolve) // If successful, resolve the promise
        .catch((error) => {
          if (triesLeft === 0) {
            reject(`Failed after ${retries} attempts: ${error}`); // Give up after all retries
          } else {
            console.log(`Retrying... Attempts left: ${triesLeft}`);
            setTimeout(() => attempt(triesLeft - 1), delay); // Wait and retry
          }
        });
    };
    attempt(retries);
  });
}

/**
 * Retries a Promise-based function with an increasing (exponential) delay.
 * @param {Function} fn - A function that returns a Promise.
 * @param {number} retries - Number of retry attempts.
 * @param {number} delay - Initial delay before first retry (in milliseconds).
 * @returns {Promise} - Resolves when the function succeeds, rejects after all retries fail.
 */
function retryWithExponentialBackoff(fn, retries = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    const attempt = (triesLeft, currentDelay) => {
      fn()
        .then(resolve) // Resolve immediately if successful
        .catch((error) => {
          if (triesLeft === 0) {
            reject(`Failed after ${retries} attempts: ${error}`); // Give up after all retries
          } else {
            console.log(
              `Retrying in ${currentDelay}ms... Attempts left: ${triesLeft}`
            );
            setTimeout(
              () => attempt(triesLeft - 1, currentDelay * 2),
              currentDelay
            ); // Double the delay on each retry
          }
        });
    };
    attempt(retries, delay);
  });
}

// Simulating an API call with a 50% failure rate
function unstableAPI() {
  return new Promise((resolve, reject) => {
    const success = Math.random() > 0.5; // 50% chance of success
    setTimeout(() => {
      success ? resolve("✅ API Success!") : reject("❌ API Failed");
    }, 500);
  });
}

// Example usage of fixed delay retry mechanism
retryPromise(unstableAPI, 3, 1000).then(console.log).catch(console.error);

// Example usage of exponential backoff retry mechanism
retryWithExponentialBackoff(unstableAPI, 3, 1000)
  .then(console.log)
  .catch(console.error);
