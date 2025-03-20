// 1 this will point to global object
this.a = 4;
console.log(a);

// 2 will also point to global object
this.a = 5;

function cal() {
  console.log(this.a);
}

cal();

// 3
this.a = 5;

const cal = () => {
  console.log(this.a);
};

cal();

// 4
let user = {
  firstName: "suhel",
  getName() {
    return this.firstName;
  },
  arrow: () => {
    console.log(this.firstName);
  },
};

console.log(user.getName());
console.log(user.arrow());

// 5
let user = {
  firstName: "suhel",
  getName() {
    const arrow = () => {
      console.log(this.firstName);
    };
    arrow();
  },
};

user.getName();

// 6
function makeUser() {
  console.log(this);
  return {
    firstName: "suhel",
    ref: this,
  };
}

const user = makeUser();

console.log(user.ref.firstName);
