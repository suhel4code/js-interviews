/*
A chain calculator allows operations to be performed 
sequentially using method chaining. Below is a simple implementation in 
JavaScript:

*/

class ChainCalculator {
  constructor(value = 0) {
    this.value = value;
  }

  add(num) {
    this.value += num;
    return this; // Enables chaining
  }

  subtract(num) {
    this.value -= num;
    return this;
  }

  multiply(num) {
    this.value *= num;
    return this;
  }

  divide(num) {
    if (num === 0) {
      console.error("Error: Division by zero!");
      return this;
    }
    this.value /= num;
    return this;
  }

  result() {
    return this.value;
  }
}

// Example Usage:
const calc = new ChainCalculator(10);
const finalValue = calc.add(5).subtract(2).multiply(3).divide(2).result();

console.log(finalValue); // Output: 19.5
