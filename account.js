const Transaction = require("./lib/transaction.js");
const Statement = require("./lib/statement.js");

class Account {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  deposit = (amount, trsx = true) => this.beginTransaction(amount, trsx);

  withdraw = (amount, trsx = false) => this.beginTransaction(amount, trsx);

  statement = (stmnt = new Statement(this.transactions)) => {
    if (!stmnt.printStatement) throw "ERROR: invalid statement";
    stmnt.printStatement();
  };

  beginTransaction = (amount, trsx) => {
    amount = this.validateAmount(amount);
    trsx = this.validateTransaction(amount, trsx);
    return this.handleTransaction(trsx);
  };

  handleTransaction = (transaction) => {
    this.transactions.push(transaction);
    this.setBalance(transaction.getData().balance);
    return this.balance;
  };

  setBalance = (amount) => (this.balance = Number(amount));

  validateTransaction = (amount, trsx) => {
    if (typeof trsx == "boolean")
      trsx = new Transaction(this.balance, amount, trsx);
    if (!trsx.getData) throw "ERROR: invalid transaction";
    return trsx;
  };

  validateAmount = (amount) => {
    amount = Number(amount);
    if (isNaN(amount)) throw "ERROR: entered value must be a number";
    if (amount <= 0) throw "ERROR: entered value must be greater than 0";
    return amount;
  };
}

module.exports = Account;
