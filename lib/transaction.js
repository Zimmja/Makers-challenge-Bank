const Formatter = require("./formatter.js");

class Transaction {
  constructor(balance, amount, isDeposit = true, date = new Date()) {
    this.balance = balance;
    this.amount = amount;
    this.isDeposit = isDeposit;
    this.date = date;
  }

  getData = (f = new Formatter()) => {
    const t = [this.tDate, this.tBalance, this.tCredit, this.tDebit];
    return { date: t[0](f), balance: t[1](f), credit: t[2](f), debit: t[3](f) };
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
