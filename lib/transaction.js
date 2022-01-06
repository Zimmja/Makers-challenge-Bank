const Formatter = require("./formatter.js");

class Transaction {
  constructor(balance, amount, isDeposit = true, date = new Date()) {
    this.balance = balance;
    this.amount = amount;
    this.isDeposit = isDeposit;
    this.date = date;
  }

  getData = (formatter = new Formatter()) => {
    return {
      date: this.tDate(formatter),
      balance: this.tBalance(formatter),
      credit: this.tCredit(formatter),
      debit: this.tDebit(formatter),
    };
  };

  tDate = (fmt, date = this.date) => {
    const day = fmt.time(date.getDate()),
      month = fmt.time(date.getMonth() + 1);
    return `${day}/${month}/${date.getFullYear()}`;
  };

  tDebit = (fmt) => this.tMoney(fmt, this.amount, this.isDeposit);

  tCredit = (fmt) => this.tMoney(fmt, this.amount, !this.isDeposit);

  tMoney = (fmt, val, nullify) => (nullify ? null : fmt.money(val));

  tBalance = (fmt) => {
    const val = this.isDeposit ? this.amount : 0 - this.amount;
    return fmt.money(this.balance + val);
  };
}

module.exports = Transaction;
