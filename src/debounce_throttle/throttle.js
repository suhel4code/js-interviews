//1
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// 2
function throttle(func, wait) {
  let lastExecuted = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastExecuted >= wait) {
      func.apply(this, args);
      lastExecuted = now;
    }
  };
}

// 3
function throttle(func, wait) {
  let lastExecuted = 0;
  let timeout = null;

  return function (...args) {
    const now = Date.now();
    const timeSinceLastExec = now - lastExecuted;

    if (timeSinceLastExec >= wait) {
      // Execute immediately if enough time has passed
      func.apply(this, args);
      lastExecuted = now;
    } else if (!timeout) {
      // Schedule the function to run at the trailing edge
      timeout = setTimeout(() => {
        func.apply(this, args);
        lastExecuted = Date.now();
        timeout = null;
      }, wait - timeSinceLastExec);
    }
  };
}
