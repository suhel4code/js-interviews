// Create an EventTarget instance
const eventTarget = new EventTarget();

// Listen for a custom event
eventTarget.addEventListener("myEvent", (event) => {
  console.log("Custom event triggered:", event.detail);
});

// Create and dispatch a custom event
const event = new CustomEvent("myEvent", {
  detail: { message: "Hello, world!" },
});
eventTarget.dispatchEvent(event);
