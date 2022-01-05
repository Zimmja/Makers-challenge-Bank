const Formatter = require("./formatter.js");

class Transaction {
  constructor(balance, amount, isDeposit = true, date = new Date()) {
    this.date = date;
    this.balance = balance;
    this.amount = amount;
    this.isDeposit = isDeposit;
  }

  getData = (format = new Formatter()) => {
    return {
      date: this.transDate(format),
      balance: this.transBalance(format),
      credit: this.transCredit(format),
      debit: this.transDebit(format),
    };
  };

  transDebit = (format, amount = this.amount) =>
    this.transMoney(format, amount, this.isDeposit);

  transCredit = (format, amount = this.amount) =>
    this.transMoney(format, amount, !this.isDeposit);

  transMoney = (format, amount, nullify) =>
    nullify ? null : format.money(amount);

  transBalance = (format, balance = this.balance, amount = this.amount) => {
    if (!this.isDeposit) amount = 0 - amount;
    return format.money(balance + amount);
  };

  transDate = (format, date = this.date) => {
    const day = format.time(date.getDate()),
      month = format.time(date.getMonth() + 1),
      year = format.time(date.getFullYear());
    return `${day}/${month}/${year}`;
  };
}

module.exports = Transaction;
