const Transaction = require("./transaction.js");
const Statement = require("./statement.js");

class Account {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  deposit = (amount, testTrans = null) => {
    this.handleTransaction(amount, true, testTrans);
  };

  withdraw = (amount, testTrans = null) => {
    this.handleTransaction(amount, false, testTrans);
  };

  handleTransaction = (amount, isDeposit, testTrans) => {
    const trans = this.testing()
      ? testTrans
      : new Transaction(this.balance, amount, isDeposit);
    this.transactions.push(trans);
    this.setBalance(trans.getData().balance);
  };

  setBalance = (amount) => {
    this.balance = Number(amount);
  };

  testing = () => process.env.NODE_ENV === "test";
}

module.exports = Account;

// const myAccount = new Account();
// myAccount.deposit(10.999);
// console.log(myAccount.balance);
// myAccount.withdraw(3);
// console.log(myAccount.balance);
