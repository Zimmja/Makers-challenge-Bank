class Transaction {
  constructor(balance, amount, isDeposit = true, date = new Date()) {
    this.date = date;
    this.balance = balance;
    this.amount = amount;
    this.isDeposit = isDeposit;
    this.formatter = require("../modules/formatter.js");
  }

  getData = () => {
    return {
      date: this.transDate(),
      balance: this.transBalance(),
      credit: this.transCredit(),
      debit: this.transDebit(),
    };
  };

  transDebit = (amount = this.amount) => {
    return this.transMoney(amount, this.isDeposit);
  };

  transCredit = (amount = this.amount) => {
    return this.transMoney(amount, !this.isDeposit);
  };

  transMoney = (amount, nullify) => {
    return nullify ? null : this.formatter.fMoney(amount);
  };

  transBalance = (balance = this.balance, amount = this.amount) => {
    if (!this.isDeposit) amount = 0 - amount;
    return this.formatter.fMoney(balance + amount);
  };

  transDate = (time = this.date) => {
    const day = this.formatter.fTime(time.getDate()),
      month = this.formatter.fTime(time.getMonth() + 1),
      year = this.formatter.fTime(time.getFullYear());
    return `${day}/${month}/${year}`;
  };
}

module.exports = Transaction;
