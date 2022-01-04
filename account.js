// const Transaction = require("./transaction.js");
// const Statement = require("./statement.js");

class Account {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  // Primary functions for use in console
  //----------------------------------------------------------------
  statement = () => {
    const viewSt = new Statement(this.transactions);
    if (!this.testing()) viewSt.printStatement();
    return this.transactions.length;
  };

  deposit = (amount, testTrans = null) => {
    this.handleTransaction(amount, true, testTrans);
    return this.balance;
  };

  withdraw = (amount, testTrans = null) => {
    this.handleTransaction(amount, false, testTrans);
    return this.balance;
  };

  // Support functions
  //----------------------------------------------------------------
  handleTransaction = (amount, dep, test) => {
    amount = Number(amount);
    if (isNaN(amount)) throw "Entered value is not a number";
    const trans = this.createTransObj(amount, dep, test);
    this.transactions.push(trans);
    this.setBalance(trans.getData().balance);
  };

  createTransObj = (amount, dep, test) => {
    return this.testing() ? test : new Transaction(this.balance, amount, dep);
  };

  setBalance = (amount) => {
    this.balance = Number(amount);
  };

  testing = () => process.env.NODE_ENV === "test";
}

module.exports = Account;
