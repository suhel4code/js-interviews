function flattenObject(obj, prefix = "", result = {}) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? `${prefix}.${key}` : key; // Construct new key

      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        // Recursively flatten nested objects
        flattenObject(obj[key], newKey, result);
      } else {
        // Assign value to the flattened key
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}

// Example usage
const nestedObj = {
  name: "Alice",
  address: {
    street: "123 Main St",
    city: "Wonderland",
    country: {
      code: "WL",
      name: "Wonderland Country",
    },
  },
  hobbies: ["reading", "gaming"], // Arrays are not flattened in this version
};

const flatObj = flattenObject(nestedObj);
console.log(flatObj);

/*
Output:
{
  "name": "Alice",
  "address.street": "123 Main St",
  "address.city": "Wonderland",
  "address.country.code": "WL",
  "address.country.name": "Wonderland Country"
}
*/
