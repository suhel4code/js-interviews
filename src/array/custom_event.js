const myArray = []; // Base array
const eventTarget = new EventTarget(); // Event system

// Override push method
myArray.push = function (...items) {
  Array.prototype.push.apply(this, items); // Call original push
  const event = new CustomEvent("push", { detail: items }); // Create custom event
  eventTarget.dispatchEvent(event); // Dispatch event
};

// Add event listener
eventTarget.addEventListener("push", (event) => {
  console.log("📢 Items Added:", event.detail);
});

// Test push
myArray.push(1, 2, 3);
myArray.push(4);
