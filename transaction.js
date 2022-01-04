class Transaction {
  constructor() {
    this.welcome = "Hello World!";
  }

  sayHello = () => {
    return this.welcome;
  };
}

module.exports = Transaction;
