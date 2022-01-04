const Transaction = require("./transaction.js");
const Statement = require("./statement.js");

class Account {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  // Primary functions for use in console
  //----------------------------------------------------------------
  statement = (testStmnt = null) => {
    const viewSt = this.createStmntObj(testStmnt);
    viewSt.printStatement();
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

  setBalance = (amount) => {
    this.balance = Number(amount);
  };

  // Test functions
  //----------------------------------------------------------------
  createStmntObj = (test) =>
    this.testing() ? test : new Statement(this.transactions);

  createTransObj = (amount, dep, test) =>
    this.testing() ? test : new Transaction(this.balance, amount, dep);

  testing = () => process.env.NODE_ENV === "test";
}

module.exports = Account;
