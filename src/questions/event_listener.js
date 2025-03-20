// EventEmitter.js

class EventEmitter {
  constructor() {
    // Object to store event listeners
    this.events = {};
  }

  /**
   * Subscribes a listener function to an event.
   * @param {string} event - The event name.
   * @param {Function} listener - The listener function to call when the event is emitted.
   */
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = []; // Initialize an empty array for the event if it doesn't exist
    }
    this.events[event].push(listener); // Add the listener to the event
  }

  /**
   * Unsubscribes a listener function from an event.
   * @param {string} event - The event name.
   * @param {Function} listener - The listener function to remove.
   */
  off(event, listener) {
    if (!this.events[event]) return; // If the event doesn't exist, do nothing

    // Filter out the listener from the event's listener array
    this.events[event] = this.events[event].filter((l) => l !== listener);
  }

  /**
   * Emits an event, calling all subscribed listeners with the provided arguments.
   * @param {string} event - The event name.
   * @param {...any} args - Arguments to pass to the listener functions.
   */
  emit(event, ...args) {
    if (!this.events[event]) return; // If the event doesn't exist, do nothing

    // Call each listener with the provided arguments
    this.events[event].forEach((listener) => listener(...args));
  }
}

// Example usage
const emitter = new EventEmitter();

// Listener 1
const listener1 = (message) => {
  console.log(`Listener 1: ${message}`);
};

// Listener 2
const listener2 = (message) => {
  console.log(`Listener 2: ${message}`);
};

// Subscribe listeners to the 'message' event
emitter.on("message", listener1);
emitter.on("message", listener2);

// Emit the 'message' event
emitter.emit("message", "Hello, World!");
// Output:
// Listener 1: Hello, World!
// Listener 2: Hello, World!

// Unsubscribe listener1 from the 'message' event
emitter.off("message", listener1);

// Emit the 'message' event again
emitter.emit("message", "Goodbye!");
// Output:
// Listener 2: Goodbye!

// 2 once
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((l) => l !== listener);
  }

  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach((listener) => listener(...args));
  }

  /**
   * Subscribes a listener to an event that will be called only once.
   * @param {string} event - The event name.
   * @param {Function} listener - The listener function to call once.
   */
  once(event, listener) {
    const onceListener = (...args) => {
      listener(...args); // Call the listener
      this.off(event, onceListener); // Remove the listener after the first call
    };
    this.on(event, onceListener); // Subscribe the once listener
  }
}

// Example usage
const emitter = new EventEmitter();

emitter.once("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

emitter.emit("greet", "Alice"); // Output: Hello, Alice!
emitter.emit("greet", "Bob"); // No output (listener was removed after the first call)
