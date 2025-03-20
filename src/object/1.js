// 1
const res = (function (a) {
  delete a; // this will give error in strict mode
  return a;
})(3);

console.log(res); // it will output a only object properties can be delete

// 2
const obj = {
  a: "one",
  b: "two",
  a: "three",
};

console.log(obj);

// 3
// given object multiply numerice properties by two

const obj = {
  a: 2,
  b: 4,
  name: "suhel",
};

function mul(obj) {
  for (key in obj) {
    if (typeof key === "number") {
      obj[key] *= 2;
    }
  }
}

mul(obj);

console.log(obj);

// 4
const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 12;
a[c] = 23;

console.log(a);

// 5
console.log([..."suhel"]);

// 6
const obj = {
  name: "suhel",
  age: 21,
  level: 0,
};

const str = JSON.stringify(obj, ["name", "age"]);

console.log(str);

// 7
const shape = {
  value: 3,
  cal() {
    return this.value * 2;
  },
  getRes: () => {
    return this.value * 2;
  },
};

console.log(shape.getRes());
console.log(shape.cal());

// 8
let person = { name: "lydia" };

const members = [person];
person = null;

console.log(members);

// 9
const obj = { age: 10 };

function cal(value = { ...obj }) {
  value.age *= 2;
}

cal(); // 10
console.log(obj);
cal(); // 10
console.log(obj);
cal(obj); // 20
console.log(obj);
cal(obj); // 40
console.log(obj);
