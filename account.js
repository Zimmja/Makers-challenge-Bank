const Transaction = require("./transaction.js");
const Statement = require("./statement.js");

class Account {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  statement = () => {
    const viewSt = new Statement(this.transactions);
    if (!this.testing()) viewSt.printStatement();
    return this.transactions.length;
  };

  deposit = (amount, testTrans = null) => {
    this.handleTransaction(amount, true, testTrans);
  };

  withdraw = (amount, testTrans = null) => {
    this.handleTransaction(amount, false, testTrans);
  };

  handleTransaction = (amount, dep, test) => {
    amount = Number(amount);
    if (isNaN(amount)) throw "Entered value is not a number";
    const trans = this.createTransObj(dep, test);
    this.transactions.push(trans);
    this.setBalance(trans.getData().balance);
  };

  createTransObj = (isDeposit, testTrans) => {
    return this.testing()
      ? testTrans
      : new Transaction(this.balance, amount, isDeposit);
  };

  setBalance = (amount) => {
    this.balance = Number(amount);
  };

  testing = () => process.env.NODE_ENV === "test";
}

module.exports = Account;
