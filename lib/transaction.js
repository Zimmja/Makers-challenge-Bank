const Formatter = require("./formatter.js");

class Transaction {
  constructor(balance, amount, isDeposit = true, date = new Date()) {
    this.date = date;
    this.balance = balance;
    this.amount = amount;
    this.isDeposit = isDeposit;
  }

  getData = (fmt = new Formatter()) => {
    return {
      date: this.transDate(fmt),
      balance: this.transBalance(fmt),
      credit: this.transCredit(fmt),
      debit: this.transDebit(fmt),
    };
  };

  transDebit = (fmt, val = this.amount) =>
    this.transMoney(fmt, val, this.isDeposit);

  transCredit = (fmt, val = this.amount) =>
    this.transMoney(fmt, val, !this.isDeposit);

  transMoney = (fmt, val, nullify) => (nullify ? null : fmt.money(val));

  transBalance = (fmt, balance = this.balance, amount = this.amount) => {
    if (!this.isDeposit) amount = 0 - amount;
    return fmt.money(balance + amount);
  };

  transDate = (fmt, date = this.date) => {
    const day = fmt.time(date.getDate()),
      month = fmt.time(date.getMonth() + 1),
      year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
}

module.exports = Transaction;
