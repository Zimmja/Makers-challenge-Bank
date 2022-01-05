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
    trsx = this.validateTransaction(amount, trsx);
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

  // Object validation
  //----------------------------------------------------------------
  validateTransaction = (amount, trsx) => {
    if (trsx === true || trsx === false)
      trsx = new Transaction(this.balance, amount, trsx);
    if (trsx.getData ? false : true) throw "ERROR: invalid transaction";
    return trsx;
  };

  validateInput = (amount) => {
    amount = Number(amount);
    if (isNaN(amount)) throw "ERROR: entered value must be a number";
    if (amount === 0) throw "ERROR: entered value must be greater than 0";
    return amount;
  };
}

module.exports = Account;

// const myStatement = new Statement([]);
// const myTransaction = new Transaction(0, 10, true);
// const myMock = { getData: () => "hello" };
// console.log(myStatement.getData ? true : false);
// console.log(myTransaction.getData ? true : false);
// console.log(myMock.getData ? true : false);
