/*
Key Takeaway: If the event keeps happening within the 
3s window, the function never executes. It only runs 
when there’s no event for a full 3 seconds.

*/

window.addEventListener(
  "resize",
  debounce(() => {
    console.log("Window resized!");
  }, 300)
);

function debounce(func, wait) {
  let timeout;

  return function (...args) {
    console.log("value of this is ", this);
    const context = this;

    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
}

function test() {
  console.log("value of this ", this);
}

const obj = {
  name: "suhel",
  cal: debounce(test, 20),
};

obj.cal();

// 2 leading edge
function debounce(func, wait, immediate) {
  let timeout;

  return function (...args) {
    const context = this;

    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

window.addEventListener(
  "resize",
  debounce(
    () => {
      console.log("resize called");
    },
    2000,
    true
  )
);

// leading edge without imeediate flag
function debounceLeading(func, wait) {
  let timeout;

  return function (...args) {
    const context = this;

    // If there's no timeout, it means this is the first call (leading edge)
    if (!timeout) {
      // Execute the function immediately
      func.apply(context, args);
    }

    // Clear any existing timeout
    clearTimeout(timeout);

    // Set a new timeout to reset the leading edge after the wait period
    timeout = setTimeout(() => {
      timeout = null; // Reset the timeout to allow the next leading edge execution
    }, wait);
  };
}

// 3
function debounce(func, wait, options = {}) {
  let timeout;
  let lastArgs;
  let lastThis;
  let result;

  const { leading = false, trailing = true } = options;

  const invokeFunc = () => {
    if (lastArgs) {
      result = func.apply(lastThis, lastArgs);
      lastArgs = null;
      lastThis = null;
    }
    return result;
  };

  const startTimer = (pendingFunc, waitTime) => {
    clearTimeout(timeout);
    timeout = setTimeout(pendingFunc, waitTime);
  };

  const leadingEdge = () => {
    if (leading) {
      invokeFunc();
    }
    startTimer(trailingEdge, wait);
  };

  const trailingEdge = () => {
    if (trailing && lastArgs) {
      invokeFunc();
    }
    timeout = null;
  };

  return function (...args) {
    lastArgs = args;
    lastThis = this;

    if (!timeout) {
      leadingEdge();
    } else if (trailing) {
      startTimer(trailingEdge, wait);
    }

    return result;
  };
}
