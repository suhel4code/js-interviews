// filename: property-flags-and-iteration.js

// ---------------------------
// 1. Property Descriptors
// ---------------------------
const obj1 = {};
Object.defineProperty(obj1, 'locked', {
  value: 'secret',
  writable: false,
  configurable: false,
  enumerable: true
});
console.log(Object.getOwnPropertyDescriptor(obj1, 'locked'));

// ---------------------------
// 2. Object.freeze()
// ---------------------------
const car = { brand: 'Toyota' };
Object.freeze(car);
car.brand = 'Honda';         // Will not change
car.year = 2024;             // Will not be added
delete car.brand;            // Will not delete
console.log(Object.isFrozen(car), car);

// ---------------------------
// 3. Object.seal()
// ---------------------------
const sealedObj = { status: 'active' };
Object.seal(sealedObj);
sealedObj.status = 'inactive'; // OK
sealedObj.newProp = true;      // Not added
delete sealedObj.status;       // Not deleted
console.log(Object.isSealed(sealedObj), sealedObj);

// ---------------------------
// 4. for...in and Enumerability
// ---------------------------
const person = Object.create({ inherited: true });
person.name = 'John';

Object.defineProperty(person, 'hidden', {
  value: 'not visible in for...in',
  enumerable: false
});

for (let key in person) {
  console.log('for...in key:', key); // Logs: name, inherited (not hidden)
}

// ---------------------------
// 5. Symbol properties
// ---------------------------
const sym1 = Symbol('secret');
const sym2 = Symbol('hidden');
const user = {
  username: 'alice',
  [sym1]: '1234'
};

Object.defineProperty(user, sym2, {
  value: 'invisible',
  enumerable: false
});

// for...in ignores symbols
for (let key in user) {
  console.log('for...in user:', key); // Only username
}

// Object.getOwnPropertySymbols
Object.getOwnPropertySymbols(user).forEach(sym => {
  console.log('Symbol key:', sym.toString(), '=>', user[sym]);
});

// ---------------------------
// 6. Full key iteration (string + symbols)
// ---------------------------
Reflect.ownKeys(user).forEach(key => {
  console.log('Reflect key:', key.toString(), '=>', user[key]);
});


// filename: for-in-vs-in.js

// -----------------------------
// Setup: base object and child
// -----------------------------
const base = {
  inheritedProp: 'I am inherited'
};

Object.defineProperty(base, 'nonEnumerableInherited', {
  value: 'Hidden',
  enumerable: false
});

const obj = Object.create(base);
obj.ownProp = 'I belong to obj';
Object.defineProperty(obj, 'nonEnumerableOwn', {
  value: 'Invisible',
  enumerable: false
});

// Symbol key
const symKey = Symbol('secret');
obj[symKey] = 'This is a symbol property';

// -----------------------------
// 1. for...in loop
// -----------------------------
console.log('--- for...in loop ---');
for (let key in obj) {
  console.log('Key found in loop:', key);
}
// Output:
// ownProp
// inheritedProp
// (non-enumerable and symbol properties are skipped)

// -----------------------------
// 2. in operator
// -----------------------------
console.log('\n--- "in" operator ---');
console.log('"ownProp" in obj:', 'ownProp' in obj);                         // true
console.log('"inheritedProp" in obj:', 'inheritedProp' in obj);             // true (from prototype)
console.log('"nonEnumerableOwn" in obj:', 'nonEnumerableOwn' in obj);       // true
console.log('"nonEnumerableInherited" in obj:', 'nonEnumerableInherited' in obj); // true
console.log('symKey in obj:', symKey in obj);                               // true (symbol works too)
console.log('"missing" in obj:', 'missing' in obj);                         // false

// -----------------------------
// Summary (console.log as a comment)
// -----------------------------
// for...in: loops over own + inherited enumerable string keys only
// "in": checks if any property (own/inherited, enumerable or not, string or symbol) exists


// filename: object-locking-methods-with-definitions.js

// -------------------------------------------
// 1. Object.preventExtensions()
// -------------------------------------------
/*
  Definition:
  - Prevents new properties from being added to the object.
  - Existing properties can still be changed or deleted.
  - Doesn’t affect writability or configurability of existing properties.
*/

console.log('--- Object.preventExtensions() ---');

const obj1 = { a: 1 };
Object.preventExtensions(obj1);

obj1.b = 2;           // Fails: cannot add new property
obj1.a = 42;          // Allowed: still writable
delete obj1.a;        // Allowed: still configurable

console.log('obj1:', obj1); // { }
console.log('Is extensible:', Object.isExtensible(obj1)); // false

// -------------------------------------------
// 2. Object.seal()
// -------------------------------------------
/*
  Definition:
  - Prevents new properties from being added.
  - Makes all existing properties non-configurable (cannot delete or reconfigure).
  - Values can still be changed if properties are writable.
*/

console.log('\n--- Object.seal() ---');

const obj2 = { x: 10 };
Object.seal(obj2);

obj2.y = 20;          // Fails: cannot add new property
obj2.x = 99;          // Allowed: still writable
delete obj2.x;        // Fails: non-configurable

console.log('obj2:', obj2); // { x: 99 }
console.log('Is sealed:', Object.isSealed(obj2)); // true

// -------------------------------------------
// 3. Object.freeze()
// -------------------------------------------
/*
  Definition:
  - Prevents adding, deleting, or changing any property.
  - Makes all properties non-configurable and non-writable.
  - The object becomes fully immutable.
*/

console.log('\n--- Object.freeze() ---');

const obj3 = { z: 100 };
Object.freeze(obj3);

obj3.z = 200;         // Fails: not writable
obj3.newProp = 300;   // Fails: cannot add
delete obj3.z;        // Fails: not configurable

console.log('obj3:', obj3); // { z: 100 }
console.log('Is frozen:', Object.isFrozen(obj3)); // true

// -------------------------------------------
// Summary Table (as comment)
// -------------------------------------------
/*
| Feature                  | preventExtensions() | seal()        | freeze()       |
|--------------------------|---------------------|---------------|----------------|
| Add new properties       | ❌ No               | ❌ No         | ❌ No          |
| Delete existing props    | ✅ Yes              | ❌ No         | ❌ No          |
| Reconfigure props        | ✅ Yes              | ❌ No         | ❌ No          |
| Modify property values   | ✅ Yes              | ✅ Yes        | ❌ No          |
| Makes props non-writable | ❌ No               | ❌ No         | ✅ Yes         |
| Makes props non-configurable | ❌ No          | ✅ Yes        | ✅ Yes         |
*/


