const formatter = require("../modules/formatter.js");

class Transaction {
  constructor(balance, amount, isDeposit = true, date = new Date()) {
    this.date = date;
    this.balance = balance;
    this.amount = amount;
    this.isDeposit = isDeposit;
    this.formatMoney = formatter.fMoney;
    this.formatDecimal = formatter.fDecimal;
    this.formatTime = formatter.fTime;
  }

  // Primary function
  //----------------------------------------------------------------
  getData = () => {
    return {
      date: this.transDate(),
      balance: this.transBalance(),
      credit: this.transCredit(),
      debit: this.transDebit(),
    };
  };

  // Define the values within the hash returned by getData()
  //----------------------------------------------------------------
  transDebit = (amount = this.amount) =>
    this.transMoney(amount, this.isDeposit);

  transCredit = (amount = this.amount) =>
    this.transMoney(amount, !this.isDeposit);

  transMoney = (amount, nullify) => (nullify ? null : this.formatMoney(amount));

  transBalance = (balance = this.balance, amount = this.amount) => {
    if (!this.isDeposit) amount = 0 - amount;
    return this.formatMoney(balance + amount);
  };

  transDate = (time = this.date) => {
    const day = this.formatTime(time.getDate()),
      month = this.formatTime(time.getMonth() + 1),
      year = this.formatTime(time.getFullYear());
    return `${day}/${month}/${year}`;
  };
}

module.exports = Transaction;
