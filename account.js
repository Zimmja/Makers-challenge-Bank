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
    if (this.invalidObj(testStmnt)) return;
    const viewSt = this.createStmntObj(testStmnt);
    viewSt.printStatement();
  };

  deposit = (amount, testTrans = null) => {
    return this.beginTransaction(amount, true, testTrans);
  };

  withdraw = (amount, testTrans = null) => {
    return this.beginTransaction(amount, false, testTrans);
  };

  // Support functions
  //----------------------------------------------------------------
  beginTransaction = (amount, deposit, test) => {
    if (this.invalidObj(test)) return;
    this.handleTransaction(amount, deposit, test);
    return this.balance;
  };

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

  invalidObj = (test) => this.testing() && test == null;

  testing = () => process.env.NODE_ENV === "test";
}

module.exports = Account;
