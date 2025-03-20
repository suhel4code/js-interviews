// using iterator:
Array.prototype.myKeys = function () {
  if (this == null || typeof this !== "object" || !("length" in this)) {
    throw new TypeError(
      "Array.prototype.myKes can not be called on non array like object"
    );
  }

  let index = 0;
  let length = this.length;

  return {
    next: function () {
      if (index < length) {
        return { value: index++, done: false };
      } else {
        return { value: undefined, done: true };
      }
    },
    [Symbol.iterator]: function () {
      return this;
    },
  };
};

const arr = [1, 2, 3];

const it = arr.myKeys();

for (const el of it) {
  console.log(el);
}

// using generator function
Array.prototype.myKeys = function* () {
  if (this == null || typeof this !== "object" || !("length" in this)) {
    throw new TypeError(
      "Array.prototype.myKes can not be called on non array like object"
    );
  }

  for (let index = 0; index < this.length; index++) {
    yield index;
  }
};

const arr = [1, 2, 3];

const it = arr.myKeys();

console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
