Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises) || promises.length === 0) {
      return; // Do nothing if no promises provided
    }

    for (const promise of promises) {
      Promise.resolve(promise)
        .then(resolve) // Resolve immediately if any promise fulfills
        .catch(reject); // Reject immediately if any promise rejects
    }
  });
};
