const Transaction = require("./lib/transaction.js");
const Statement = require("./lib/statement.js");

class Account {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  // Primary functions for use in console
  //----------------------------------------------------------------
  deposit = (amount, trsx = true) => {
    return this.beginTransaction(amount, trsx);
  };

  withdraw = (amount, trsx = false) => {
    return this.beginTransaction(amount, trsx);
  };

  statement = (stmnt = new Statement(this.transactions)) => {
    stmnt.printStatement();
  };

  // Support functions
  //----------------------------------------------------------------
  beginTransaction = (amount, trsx) => {
    amount = Number(amount);
    if (isNaN(amount)) throw "Entered value is not a number";
    if (trsx === true || trsx === false)
      trsx = new Transaction(this.balance, amount, trsx);
    return this.handleTransaction(trsx);
  };

  handleTransaction = (transaction) => {
    this.transactions.push(transaction);
    this.setBalance(transaction.getData().balance);
    return this.balance;
  };

  setBalance = (amount) => {
    this.balance = Number(amount);
  };
}

module.exports = Account;

// const c1 = true;
// const c2 = false;
// const c3 = "hello";

// console.log(c1 === true);
// console.log(c2 === true);
// console.log(c3 === true);
