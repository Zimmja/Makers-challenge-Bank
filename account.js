const Transaction = require("./transaction.js");
const Statement = require("./statement.js");

class Account {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  // STOP;

  // Primary functions for use in console
  //----------------------------------------------------------------
  statement = (stmnt = new Statement(this.transactions)) => {
    stmnt.printStatement();
  };

  deposit = (amount, trans = new Transaction(this.balance, amount, true)) => {
    return this.beginTransaction(amount, trans);
  };

  withdraw = (amount, trans = new Transaction(this.balance, amount, false)) => {
    return this.beginTransaction(amount, trans);
  };

  // Support functions
  //----------------------------------------------------------------
  beginTransaction = (amount, trans) => {
    amount = Number(amount);
    if (isNaN(amount)) throw "Entered value is not a number";
    this.handleTransaction(trans);
    return this.balance;
  };

  handleTransaction = (trans) => {
    this.transactions.push(trans);
    this.setBalance(trans.getData().balance);
  };

  setBalance = (amount) => {
    this.balance = Number(amount);
  };
}

module.exports = Account;
