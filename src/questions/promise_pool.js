class PromisePool {
  /**
   * Creates a Promise Pool.
   * @param {number} concurrencyLimit - The maximum number of promises to run concurrently.
   */
  constructor(concurrencyLimit) {
    this.concurrencyLimit = concurrencyLimit; // Maximum number of concurrent tasks
    this.running = 0; // Number of currently running tasks
    this.queue = []; // Queue of tasks waiting to be executed
  }

  /**
   * Adds a task to the pool.
   * @param {Function} task - A function that returns a promise.
   * @returns {Promise} - A promise that resolves when the task completes.
   */
  addTask(task) {
    return new Promise((resolve, reject) => {
      // Wrap the task to handle its completion
      const wrappedTask = async () => {
        try {
          this.running++; // Increment the running task count
          const result = await task(); // Execute the task
          resolve(result); // Resolve the promise with the result
        } catch (error) {
          reject(error); // Reject the promise if the task fails
        } finally {
          this.running--; // Decrement the running task count
          this.runNext(); // Run the next task in the queue
        }
      };

      // Add the wrapped task to the queue
      this.queue.push(wrappedTask);

      // Start executing tasks if we're below the concurrency limit
      if (this.running < this.concurrencyLimit) {
        this.runNext();
      }
    });
  }

  /**
   * Runs the next task in the queue if there's capacity.
   */
  runNext() {
    if (this.running >= this.concurrencyLimit || this.queue.length === 0) {
      return; // Do nothing if the concurrency limit is reached or the queue is empty
    }

    const task = this.queue.shift(); // Get the next task from the queue
    task(); // Execute the task
  }
}

// Example usage
const pool = new PromisePool(2); // Limit concurrency to 2 tasks

// Simulate asynchronous tasks
const tasks = [
  () => new Promise((resolve) => setTimeout(() => resolve("Task 1"), 1000)),
  () => new Promise((resolve) => setTimeout(() => resolve("Task 2"), 500)),
  () => new Promise((resolve) => setTimeout(() => resolve("Task 3"), 800)),
  () => new Promise((resolve) => setTimeout(() => resolve("Task 4"), 300)),
  () => new Promise((resolve) => setTimeout(() => resolve("Task 5"), 1200)),
];

// Add tasks to the pool
tasks.forEach((task, index) => {
  pool
    .addTask(task)
    .then((result) => console.log(`${result} completed`))
    .catch((error) => console.error(`Error: ${error}`));
});

// 2 advanced
class PromisePool {
  constructor(concurrencyLimit, onProgress) {
    this.concurrencyLimit = concurrencyLimit;
    this.running = 0;
    this.queue = [];
    this.onProgress = onProgress; // Callback for progress tracking
  }

  addTask(task) {
    return new Promise((resolve, reject) => {
      const wrappedTask = async () => {
        try {
          this.running++;
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          this.running--;
          this.runNext();
          if (this.onProgress) {
            this.onProgress(this.running, this.queue.length);
          }
        }
      };
      this.queue.push(wrappedTask);
      if (this.running < this.concurrencyLimit) {
        this.runNext();
      }
    });
  }

  runNext() {
    if (this.running >= this.concurrencyLimit || this.queue.length === 0) {
      return;
    }
    const task = this.queue.shift();
    task();
  }
}

// Example usage with progress tracking
const pool = new PromisePool(2, (running, remaining) => {
  console.log(`Running: ${running}, Remaining: ${remaining}`);
});

const tasks = [
  () => new Promise((resolve) => setTimeout(() => resolve("Task 1"), 1000)),
  () => new Promise((resolve) => setTimeout(() => resolve("Task 2"), 500)),
  () => new Promise((resolve) => setTimeout(() => resolve("Task 3"), 800)),
  () => new Promise((resolve) => setTimeout(() => resolve("Task 4"), 300)),
  () => new Promise((resolve) => setTimeout(() => resolve("Task 5"), 1200)),
];

tasks.forEach((task, index) => {
  pool
    .addTask(task)
    .then((result) => console.log(`${result} completed`))
    .catch((error) => console.error(`Error: ${error}`));
});
