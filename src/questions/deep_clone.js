function deepClone(obj) {
  // If obj is null or not an object, return it (base case)
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // Handle Date object separately
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  // Handle Array separately
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)); // Recursively clone each element
  }

  // Handle Objects
  const clonedObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]); // Recursively clone nested properties
    }
  }

  return clonedObj;
}

// Example usage
const original = {
  name: "Alice",
  age: 25,
  address: {
    city: "Wonderland",
    zip: "12345",
  },
  hobbies: ["reading", "gaming"],
  birthdate: new Date("2000-01-01"),
};

const cloned = deepClone(original);

// Modifying the clone to verify deep cloning
cloned.address.city = "New City";
cloned.hobbies.push("swimming");

console.log(original.address.city); // "Wonderland" (remains unchanged)
console.log(original.hobbies); // ["reading", "gaming"] (remains unchanged)
console.log(cloned.birthdate === original.birthdate); // false (new Date instance)
