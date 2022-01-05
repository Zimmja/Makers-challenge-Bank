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
    amount = this.validateInput(amount);
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

  validateInput = (amount) => {
    amount = Number(amount);
    if (isNaN(amount)) throw "Entered value must be a number";
    if (amount === 0) throw "Entered value must be greater than 0";
    return amount;
  };
}

module.exports = Account;
