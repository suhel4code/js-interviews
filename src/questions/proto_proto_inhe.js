/*
### **Prototype and Prototype Inheritance in JavaScript**

In JavaScript, objects inherit properties and methods from a prototype. 
Here's how prototype-based inheritance works:

---

### **1. Prototype Example**
Each JavaScript function has a `prototype` property, which is used to 
attach methods and properties that objects created from the function can inherit.

*/
// Constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Adding a method to the prototype
Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
};

// Creating instances
const person1 = new Person("Alice", 25);
const person2 = new Person("Bob", 30);

person1.greet(); // Output: Hello, my name is Alice and I am 25 years old.
person2.greet(); // Output: Hello, my name is Bob and I am 30 years old.

/*
Here, `greet()` is defined on `Person.prototype`, so all 
instances of `Person` inherit it.

*/

/* **2. Prototype Inheritance Example**
We can create a new constructor that inherits from an existing prototype.

*/
// Child constructor function
function Employee(name, age, jobTitle) {
  Person.call(this, name, age); // Call the parent constructor
  this.jobTitle = jobTitle;
}

// Inheriting from Person
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

// Adding a method to Employee prototype
Employee.prototype.work = function () {
  console.log(`${this.name} is working as a ${this.jobTitle}.`);
};

// Creating an instance of Employee
const emp1 = new Employee("Charlie", 28, "Software Engineer");

emp1.greet(); // Inherited from Person: Hello, my name is Charlie and I am 28 years old.
emp1.work(); // Employee method: Charlie is working as a Software Engineer.

/*

### **How it Works**
1. `Employee` calls `Person.call(this, name, age)`, inheriting the properties.
2. `Employee.prototype = Object.create(Person.prototype);` sets up prototype inheritance.
3. `Employee.prototype.constructor = Employee;` ensures the constructor is correctly set.
4. Now, `Employee` instances inherit both `Person` and their own methods.

This approach allows us to create hierarchical objects efficiently in 
JavaScript. Let me know if you need more details!

*/
