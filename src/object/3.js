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
