const Transaction = require("./lib/transaction.js");
const Statement = require("./lib/statement.js");

class Account {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  // Primary functions for use in console
  //----------------------------------------------------------------
  deposit = (amount, trsx = new Transaction(this.balance, amount, true)) => {
    return this.beginTransaction(amount, trsx);
  };

  withdraw = (amount, trsx = new Transaction(this.balance, amount, false)) => {
    return this.beginTransaction(amount, trsx);
  };

  statement = (stmnt = new Statement(this.transactions)) => {
    stmnt.printStatement();
  };

  // Support functions
  //----------------------------------------------------------------
  beginTransaction = (amount, transaction) => {
    amount = Number(amount);
    if (isNaN(amount)) throw "Entered value is not a number";
    return this.handleTransaction(transaction);
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
