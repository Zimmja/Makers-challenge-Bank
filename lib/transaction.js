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

  transDebit = (fmt) => this.transMoney(fmt, this.amount, this.isDeposit);

  transCredit = (fmt) => this.transMoney(fmt, this.amount, !this.isDeposit);

  transMoney = (fmt, val, nullify) => (nullify ? null : fmt.money(val));

  transBalance = (fmt) => {
    const val = this.isDeposit ? this.amount : 0 - this.amount;
    return fmt.money(this.balance + val);
  };

  transDate = (fmt) => {
    const day = fmt.time(this.date.getDate()),
      month = fmt.time(this.date.getMonth() + 1),
      year = this.date.getFullYear();
    return `${day}/${month}/${year}`;
  };
}

module.exports = Transaction;
