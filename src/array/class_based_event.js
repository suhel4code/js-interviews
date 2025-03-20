class ObservableArray extends EventTarget {
  constructor(...args) {
    super();
    this.array = [...args];

    // Attach event listeners inside the class
    this.addEventListener("push", (event) => {
      console.log("Inside Class - Push Event:", event.detail);
    });

    this.addEventListener("pop", (event) => {
      console.log("Inside Class - Pop Event:", event.detail);
    });
  }

  push(...items) {
    const oldLength = this.array.length;
    const newLength = this.array.push(...items);

    // Dispatch event when push occurs
    this.dispatchEvent(
      new CustomEvent("push", { detail: { items, oldLength, newLength } })
    );
    return newLength;
  }

  pop() {
    if (this.array.length === 0) return undefined;
    const poppedItem = this.array.pop();

    // Dispatch event when pop occurs
    this.dispatchEvent(
      new CustomEvent("pop", {
        detail: { poppedItem, newLength: this.array.length },
      })
    );
    return poppedItem;
  }
}

// Create an observable array
const myArray = new ObservableArray(1, 2, 3);

// No need to manually add event listeners outside the class!
myArray.push(4, 5);
myArray.pop();
